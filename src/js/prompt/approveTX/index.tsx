import { info } from 'loglevel';
import * as React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';
import Web3 = require('web3');

import networks from 'bcnetwork';
import InternalMessage from 'services/InternalMessage';
import { AUTH_IS_READY } from 'constants/auth';
import { ACCOUNT_INFO } from 'constants/account';

import Info from './Info';
import Control from './Control';

import DialogLayout from '../../popup/layouts/DialogLayout';
import Typography from '../../popup/ui/Typography';
import Divider from '../../popup/ui/Divider';
import Button from '../../popup/ui/Button';
import getPrice from 'helpers/getPrice';
import { getTotalGas } from 'helpers/eth';
import { SETTINGS_LOAD_CURRENCY_PRICE, SETTINGS_LOAD_CURRENCY_PRICE_SUCCESS } from 'constants/settings';

const web3 = new Web3();

const Actions = styled('div')`
  display: flex;
  margin: 20px 20px 0 20px;
  justify-content: space-between;
`;

interface IAppState {
  isLoaded?: boolean;
  isReady?: boolean;

  tx?: any;
  blockchain?: string;

  accounts?: any[];
  account?: any;

  prices: any;
}

interface IApproveProps {
  prompt: IPrompt;
}

export default class App extends React.Component<IApproveProps, IAppState> {
  public state = {
    isLoaded: false,
    isReady: false,
    tx: null,
    blockchain: null,
    accounts: [],
    account: null,
    prices: null
  };

  public componentDidMount () {
    InternalMessage.signal(AUTH_IS_READY)
      .send()
      .then(({ isReady }) => {
        if (!isReady) {
          throw new Error('You need to authorize');
        }

        return InternalMessage.signal(ACCOUNT_INFO).send();
      })
      .then(res => {
        this.setAccounts(res.payload.accounts);
        this.setTxInfo(this.props.prompt.data);
      })
      .catch(e => {
        info(e);
        this.setState(state => ({
          ...state,
          isLoaded: true,
          isReady: false
        }));
      });

    InternalMessage.signal(SETTINGS_LOAD_CURRENCY_PRICE)
      .send()
      .then(result => {
        const {
          type,
          payload: { prices, providers }
        } = result;

        if (type === SETTINGS_LOAD_CURRENCY_PRICE_SUCCESS && prices && Array.isArray(providers)) {
          this.setState({ prices });
        }
      })
      .catch(e => {
        info(e);
        this.setState(state => ({
          ...state,
          isLoaded: true,
          isReady: false
        }));
      });
  }

  public setTxInfo (data: any) {
    const accounts = this.state.accounts.filter(acc => acc.blockchain === data.blockchain);
    const account = data.tx.from ? accounts.find(acc => acc.info.address === data.tx.from) : accounts[0];

    info('receive tx > ', data);

    this.setState(state => ({
      ...state,
      tx: data.tx,
      blockchain: data.blockchain,
      accounts,
      account
    }));
  }

  public setAccounts (accounts) {
    let account;
    if (accounts && accounts.length > 0) {
      account = accounts[0];
    }

    this.setState(state => ({
      ...state,
      accounts,
      account,
      isLoaded: true,
      isReady: true
    }));
  }

  public onSubmit = payload => {
    const { tx } = this.state;

    this.props.prompt.responder({
      tx
    });
    this.onReject();
  };

  public onReject = () => {
    window.close();
  };

  get amount () {
    const { tx, blockchain } = this.state;

    if (blockchain === networks.BTC.sign) {
      return `${tx.amount} BTC`;
    }
    if (blockchain === networks.ETH.sign) {
      return `${web3.utils.fromWei(tx.value, 'ether')} ETH`;
    }

    return null;
  }

  get gasControls () {
    const gasPrice = web3.utils.fromWei(web3.utils.hexToNumber(this.state.tx.gasPrice).toString(), 'gwei');
    const gasLimit = web3.utils.hexToNumber(this.state.tx.gasLimit);
    const handlePrice = e => this.handleUpdateTX('gasPrice', e);
    const handleLimit = e => this.handleUpdateTX('gasLimit', e);
    const totalGas = getTotalGas(+gasPrice, +this.state.tx.gasLimit);

    return (
      <React.Fragment>
        <Control label="Gas Price:" value={gasPrice} onChange={handlePrice} secondLabel="gwei" />
        <Control label="Gas Limit:" value={gasLimit} onChange={handleLimit} />
        <Typography variant="body1" color="main">
          Cost transaction:
          {getPrice(this.state.prices, this.state.account.blockchain, +totalGas)} USD
        </Typography>
      </React.Fragment>
    );
  }

  public handleUpdateTX (field, e) {
    const value = e && e.target ? e.target.value : e;
    const getValue = (prop, vl = 0) => {
      switch (prop) {
        case 'gasPrice':
          return web3.utils.toHex(web3.utils.toWei(vl.toString(), 'gwei'));
        case 'gasLimit':
          return web3.utils.toHex(vl.toString());
      }
    };
    const hexValue = getValue(field, value);

    this.setState(state => ({
      ...state,
      tx: {
        ...state.tx,
        [field]: hexValue
      }
    }));
  }

  public render () {
    // TODO: return loader
    if (!this.state.isLoaded) {
      return null;
    }

    // TODO: style this caption
    if (!this.state.isReady || !this.state.tx) {
      return (
        <DialogLayout>
          <Typography color="main">You need to authorize</Typography>
        </DialogLayout>
      );
    }

    const {
      account: {
        info: { address, balance },
        blockchain
      },
      tx: { to, data },
      tx
    } = this.state;
    const isEth = blockchain === networks.ETH.sign;

    info('tx', tx);

    return (
      <DialogLayout>
        <Inner>
          <div
            className={css`
              display: flex;
              flex-direction: column;
            `}
          />
          <Typography color="main" variant="subheading">
            Send TX with params:
          </Typography>
          <Info label="From:" content={[address, `${balance} ${blockchain}`]} />
          <Info label="To:" content={to} />
          <Divider />
          <Info label="Amount:" center content={[this.amount]} />
          <Divider />
          {isEth && this.gasControls}
          {data && <Info label="Data:" content={data} />}
          <Actions>
            <Button large outlined onClick={this.onReject}>
              Reject
            </Button>
            <Button large onClick={this.onSubmit}>
              Submit
            </Button>
          </Actions>
        </Inner>
      </DialogLayout>
    );
  }
}

const Inner = styled('div')`
  padding: 0 20px;
`;
