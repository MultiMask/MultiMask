import * as React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';
import Web3 = require('web3');

import networks from '../blockchain';
import InternalMessage from '../libs/InternalMessage';
import { AUTH_IS_READY } from '../constants/auth';
import { ACCOUNT_INFO } from '../constants/account';
import { TX_PAYMENT_GET, TX_APPROVE_RESULT } from '../constants/tx';

import DialogLayout from '../popup/layouts/DialogLayout';
import Typography from '../popup/ui/Typography';
import Select from '../popup/ui/Select';
import Info from './Info';
import Control from './Control';
import Divider from '../popup/ui/Divider';
import Button from '../popup/ui/Button';

let web3 = new Web3();

const Actions = styled('div')`
  display: flex;
  margin: 20px 20px 0 20px;
  justify-content: space-between;
`;

interface AppState {
  isLoaded?: boolean;
  isReady?: boolean;

  tx?: any;
  txId?: string;
  blockchain?: string;

  accounts?: any[];
  account?: any;
  selectValue?: SelectOption;
}

type SelectOption = {
  value: string;
  label: string;
}

export default class App extends React.Component<{}, AppState> {
  state = {
    isLoaded: false,
    isReady: false,
    tx: null,
    txId: null,
    blockchain: null,
    accounts: [],
    account: null,
    selectValue: null
  };

  componentDidMount() {
    InternalMessage.signal(AUTH_IS_READY)
      .send()
      .then(({ payload: { isReady } }) => {
        if (!isReady) throw new Error('You need to authorize');

        return InternalMessage.signal(ACCOUNT_INFO).send();
      })
      .then(({ payload: accounts }) => {
        this.setAccounts(accounts);

        return InternalMessage.signal(TX_PAYMENT_GET).send();
      })
      .then(({ payload }) => {
        this.setTxInfo(payload);
      })
      .catch(e => {
        console.log(e);
        this.setState(state => ({
          ...state,
          isLoaded: true,
          isReady: false
        }));
      });
  }

  setTxInfo(payload: any) {
    const accounts = this.state.accounts.filter(acc => acc.blockchain === payload.data.blockchain);
    const account = payload.data.tx.from
      ? accounts.find(acc => acc.info.address === payload.data.tx.from)
      : accounts[0];

    console.log('receive tx > ', payload);

    this.setState(state => ({
      ...state,
      tx: payload.data.tx,
      txId: payload.id,
      blockchain: payload.data.blockchain,
      accounts,
      account,
      selectValue: this.getOption(account)
    }));
  }

  setAccounts(accounts) {
    let account;
    if (accounts && accounts.length > 0) {
      account = accounts[0];
    }

    this.setState(state => ({
      ...state,
      accounts,
      account,
      selectValue: this.getOption(account),
      isLoaded: true,
      isReady: true
    }));
  }

  getOption = (account): SelectOption => {
    return { value: account.id, label: `${account.info.address} - ${account.info.balance} ${account.blockchain}` };
  };

  handleChooseAccount = e => {
    const { accounts } = this.state;
    this.setState({ account: accounts.find(account => account.id === e.value), selectValue: e });
  };

  onSubmit = payload => {
    const { tx, txId } = this.state;

    InternalMessage.payload(TX_APPROVE_RESULT, {
      id: txId,
      tx
    })
      .send()
      .then(() => {
        // TODO: show txhash and loading to update info about it
        window.close();
      });
  };

  onReject = () => {
    window.close();
  };

  get options() {
    if (this.state.accounts) {
      return this.state.accounts.map((account, idx) => {
        return this.getOption(account);
      });
    }

    return [];
  }

  get amount() {
    const { tx, blockchain } = this.state;

    if (blockchain === networks.BTC.sign) {
      return `${tx.amount / 1e8} BTC`;
    }
    if (blockchain === networks.ETH.sign) {
      return `${web3.utils.fromWei(tx.value, 'ether')} ETH`;
    }

    return null;
  }

  get gasControls() {
    const gasPrice = web3.utils.fromWei(web3.utils.hexToNumber(this.state.tx.gasPrice).toString(), 'gwei');
    const gasLimit = web3.utils.hexToNumber(this.state.tx.gasLimit);
    const handlePrice = e => this.handleUpdateTX('gasPrice', e);
    const handleLimit = e => this.handleUpdateTX('gasLimit', e);

    return (
      <React.Fragment>
        <Control label="Gas Price:" value={gasPrice} onChange={handlePrice} secondLabel="gwei" />
        <Control label="Gas Limit:" value={gasLimit} onChange={handleLimit} />
      </React.Fragment>
    );
  }

  handleUpdateTX(field, e) {
    const value = e && e.target ? e.target.value : e;
    const getValue = (field, value = 0) => {
      switch (field) {
        case 'gasPrice':
          return web3.utils.toHex(web3.utils.toWei(value.toString(), 'gwei'));
        case 'gasLimit':
          return web3.utils.toHex(value.toString());
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

  render() {
    // TODO: return loader
    if (!this.state.isLoaded || !this.state.tx) return null;

    // TODO: style this caption
    if (!this.state.isReady) {
      return (
        <DialogLayout>
          <Typography color="main">You need to authorize</Typography>
        </DialogLayout>
      );
    }

    const {
      account: {
        info: { address, balance },
        blockchain,
        id
      },
      tx: { to, amount, data },
      tx,
      selectValue
    } = this.state;
    const isEth = blockchain === networks.ETH.sign;

    console.log('tx', tx);

    return (
      <DialogLayout>
        <div
          className={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <Typography
            className={css`
              margin-right: 10px;
            `}
            color="main"
            variant="subheading"
          >
            Select wallet:
          </Typography>
          <Select options={this.options} onChange={value => this.handleChooseAccount(value)} value={selectValue} />
        </div>
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
      </DialogLayout>
    );
  }
}
