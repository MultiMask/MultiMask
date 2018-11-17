import axios from 'axios';

const Explorer = {
  getBalance: (address, network) => {
    return axios.get(`https://chain.so/api/v2/get_address_balance/${network}/${address}`)
  },
  
  getInfo: (address, network) => {
    return axios.get(`https://chain.so/api/v2/address/${network}/${address}`)
  },

  getUnspentTX: (address, network) => {
    return axios.get(`https://chain.so/api/v2/get_tx_unspent/${network}/${address}`)
  },

  pushTX: (tx, network) => {
    return axios.post(`https://chain.so/api/v2/send_tx/${network}`, tx)
  },

  coinsigns: {
    BTC: 'BTC',
    BTCTEST: 'BTCTEST',
    DOGE: 'DOGE',
    DOGETEST: 'DOGETEST',
    LTC: 'LTC',
    LTCTEST: 'LTCTEST',
  }
}

export default Explorer;