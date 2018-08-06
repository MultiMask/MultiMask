import React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';

import InternalMessage from '../libs/InternalMessage';
import { AUTH_IS_READY } from './../constants/auth';
import { ACCOUNT_INFO } from './../constants/account';
import { TX_PAYMENT_GET, TX_SEND } from './../constants/tx';

import DialogLayout from '../popup/layouts/DialogLayout';
import Typography from '../popup/ui/Typography';
import Select from '../popup/ui/Select';
import Info from './Info';
import Divider from '../popup/ui/Divider';
import Button from '../popup/ui/Button';

const Actions = styled.div`
  display: flex;
  margin: 20px 20px 0 20px;
  justify-content: space-between;
`;

export default class App extends React.Component {
  constructor(opts) {
    super(opts);

    this.state = {
      isLoaded: false,
      isReady: false,
      tx: {},
      accounts: [],
      account: {},
      selectValue: ''
    };
  }

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
        this.setTxInfo(payload[0]);
      })
      .catch(e => {
        this.setState(state => ({
          ...state,
          isLoaded: true,
          isReady: false
        }));
      });
  }

  setTxInfo(data) {
    this.setState(state => ({
      ...state,
      tx: data.tx
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

  getOption = account => {
    return { value: account.id, label: `${account.info.address} - ${account.info.balance} ${account.blockchain}` };
  };

  handleChooseAccount = e => {
    const { accounts } = this.state;
    this.setState({ account: accounts.find(account => account.id === e.value), selectValue: e });
  };

  onSubmit = payload => {
    const { account, tx } = this.state;
    const { to, amount, data } = tx;

    InternalMessage.payload(TX_SEND, {
      id: account.id,
      tx: {
        to,
        amount,
        data
      }
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

  render() {
    // TODO: return loader
    if (!this.state.isLoaded) return null;

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
      selectValue
    } = this.state;

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
        <Info label="From:" content={[address, `${balance} ${blockchain}`, '? USD']} />
        <Info label="To:" content={to} />
        <Divider />
        <Info label="Amount:" center content={[`${amount / 1e8} ETH`, '? USD']} />
        <Divider />
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
