import networks from './../blockchain';
import '../../img/btc.png';

export default function({ blockchain }) {
  switch (blockchain) {
    case networks.BTC.sign: {
      return './btc.png';
    }
  }
}
