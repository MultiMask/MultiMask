import * as ricardianParser from 'eos-rc-parser';

import Network from 'models/Network';
import {IdentityRequiredFields} from 'models/Identity';
import { strippedHost } from 'helpers/net';

import { REQUEST_SIGNATURE } from 'constants/blockchains/eos';

const proxy = (dummy, handler) => new Proxy(dummy, handler);

let messageSender;

export default sender => {
  messageSender = sender;

  return (network, _eos, _options: any = {}, protocol = 'http') => {
    if(!['http', 'https', 'ws'].includes(protocol)) {
        throw new Error('Protocol must be either http, https, or ws');
    }

    // Backwards compatibility: Networks now have protocols, but some older dapps still use the argument
    if(!network.hasOwnProperty('protocol') || !network.protocol.length) {
        network.protocol = protocol;
    }

    network = Network.fromJson(network);
    if(!network.isValid()) throw new Error('Invalid network');
    const httpEndpoint = `${network.protocol}://${network.hostport()}`;

    // The proxy stands between the eosjs object and scatter.
    // This is used to add special functionality like adding `requiredFields` arrays to transactions
    return proxy(_eos({httpEndpoint, chainId:_options.chainId}), {
        get (eosInstance, method) {

            const returnedFields = null;

            return (...args) => {

                if(args.find(arg => arg.hasOwnProperty('keyProvider'))) throw new Error("Already use keyProvider");

                let requiredFields = args.find(arg => arg.hasOwnProperty('requiredFields'));
                requiredFields = IdentityRequiredFields.fromJson(requiredFields ? requiredFields.requiredFields : {});
                if(!requiredFields.isValid()) throw new Error("Required fields is invalid");

                // The signature provider which gets elevated into the user's MultiMask
                const signProvider = async signargs => {
                    // TODO: Check Identity

                    // Friendly formatting
                    signargs.messages = await requestParser(_eos, signargs, httpEndpoint, args[0], _options.chainId);

                    const payload = Object.assign(signargs, { domain:strippedHost(), network, requiredFields });
                    const result = await messageSender(REQUEST_SIGNATURE, payload);

                    // No signature
                    if(!result) return null;

                    if(result.hasOwnProperty('signatures')){
                        // Holding onto the returned fields for the final result
                        // returnedFields = result.returnedFields;

                        // Grabbing buf signatures from local multi sig sign provider
                        const multiSigKeyProvider = args.find(arg => arg.hasOwnProperty('signProvider'));
                        if(multiSigKeyProvider){
                            result.signatures.push(multiSigKeyProvider.signProvider(signargs.buf, signargs.sign));
                        }

                        // Returning only the signatures to eosjs
                        return result.signatures;
                    }

                    return result;
                };

                // TODO: We need to check about the implications of multiple eosjs instances
                return new Promise((resolve, reject) => {
                    _eos(Object.assign(_options, {httpEndpoint, signProvider}))[method](...args)
                        .then(result => {

                            // Standard method ( ie. not contract )
                            if(!result.hasOwnProperty('fc')){
                                result = Object.assign(result, {returnedFields});
                                resolve(result);
                                return;
                            }

                            // Catching chained promise methods ( contract .then action )
                            const contractProxy = proxy(result, {
                                get (instance,method){
                                    if(method === 'then') return instance[method];
                                    return (...args) => {
                                        return new Promise(async (res, rej) => {
                                            instance[method](...args).then(actionResult => {
                                                res(Object.assign(actionResult, {returnedFields}));
                                            }).catch(rej);
                                        })

                                    }
                                }
                            });

                            resolve(contractProxy);
                        }
                        ).catch(error => reject(error))
                })
            }
        }
    }); // Proxy
}
}

const requestParser = async (_eos, signargs, httpEndpoint, possibleSigner, chainId) => {

  const eos = _eos({httpEndpoint, chainId});

  const contracts = signargs.transaction.actions.map(action => action.account)
      .reduce((acc, contract) => {
          if(!acc.includes(contract)) acc.push(contract);
          return acc;
  }, []);

  const staleAbi = +new Date() - (1000 * 60 * 60 * 24 * 2);
  const abis = {};

  await Promise.all(contracts.map(async contractAccount => {
      // const cachedABI = await messageSender(NetworkMessageTypes.ABI_CACHE, {abiContractName:contractAccount, abiGet:true, chainId});

      // if(cachedABI === 'object' && cachedABI.timestamp > +new Date((await eos.getAccount(contractAccount)).last_code_update))
      //     abis[contractAccount] = eos.fc.abiCache.abi(contractAccount, cachedABI.abi);

      // else {
          abis[contractAccount] = (await eos.contract(contractAccount)).fc;
          const savableAbi = JSON.parse(JSON.stringify(abis[contractAccount]));
          delete savableAbi.schema;
          delete savableAbi.structs;
          delete savableAbi.types;
          savableAbi.timestamp = +new Date();

          // await messageSender(NetworkMessageTypes.ABI_CACHE,
          //     {abiContractName: contractAccount, abi:savableAbi, abiGet: false, chainId});
      // }
  }));

  return Promise.all(signargs.transaction.actions.map(async (action, index) => {
      const contractAccountName = action.account;

      const abi = abis[contractAccountName];

      const data = abi.fromBuffer(action.name, action.data);
      const actionAbi = abi.abi.actions.find(fcAction => fcAction.name === action.name);
      let ricardian = actionAbi ? actionAbi.ricardian_contract : null;


      if(ricardian){
          const htmlFormatting = {h1:'div class="ricardian-action"', h2:'div class="ricardian-description"'};
          const signer = action.authorization.length === 1 ? action.authorization[0].actor : null;
          ricardian = ricardianParser.parse(action.name, data, ricardian, signer, htmlFormatting);
      }

      return {
          data,
          code:action.account,
          type:action.name,
          authorization:action.authorization,
          ricardian
      };
  }));

}
