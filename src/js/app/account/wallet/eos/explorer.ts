import axios from 'axios';

const Explorer = {
  getInfo: (account, network) => {
    return axios.get(`
    https://${getNet(network)}eospark.com/api/account/${account}/actions?action_type=token&show_trx_small=0&show_trx_in=1&show_trx_out=1&page=1&size=50
    `)
    .then(response => {
      return response.data.data;
    })
  },
}

const getNet = net => {
  switch(net) {
    case 'testnet':
      return 'jungle.';
    case 'mainnet':
      return '';
  }
}

export default Explorer;
