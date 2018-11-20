import BTCSender from './btcSender';
import ETHSender from './ethSender';
import { ISender, ISenderParams } from 'types/crypto3';

enum BlockchainsTypes {
  Eth = 'ETH',
  Btc = 'BTC',
  Eos = 'EOS'
}

class TransportLocator {
  private [BlockchainsTypes.Btc] (params: ISenderParams) {
    return new BTCSender(params);
  }

  private [BlockchainsTypes.Eth] (params: ISenderParams) {
    return new ETHSender(params);
  }

  public create (props) {
    const creator = this[props.blockchainType];
    if (!creator) {
      return Error('Not support this blockchain');
    }

    return creator(props);
  }
}

export default new TransportLocator();
