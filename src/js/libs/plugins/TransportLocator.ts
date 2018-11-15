import BTCSender from './btcSender';
// import ETHSender from './ethSender';
import { ISenderParams } from './types';

enum BlockchainsTypes {
  Eth = 'ETH',
  Btc = 'BTC',
  Eos = 'EOS'
}

class TransportLocator {
  private [BlockchainsTypes.Btc] (params: ISenderParams) {
    return new BTCSender(params);
  }

  public create (props) {
    const creator = this[props.blockchainType];
    return creator(props);
  }
}

export default new TransportLocator();
