import React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';
import messaging from './message';
import { ACCOUNT_INFO, ACCOUNT_INFO_RESULT } from './../constants/account';
import { TX_PAYMENT_GET, TX_PAYMENT_RESULT, TX_CREATE } from './../constants/tx';
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
      tx: {},
      accounts: [],
      account: {},
      selectValue: ''
    };
  }

  componentDidMount() {
    messaging.send({
      type: TX_PAYMENT_GET
    });

    messaging.on(TX_PAYMENT_RESULT, data => {
      this.setTxInfo(data);
    });

    messaging.send({
      type: ACCOUNT_INFO
    });

    messaging.on(ACCOUNT_INFO_RESULT, data => {
      this.setAccounts(data);
    });
  }

  setTxInfo(data) {
    this.setState(state => ({
      ...state,
      tx: data.tx
    }));
  }

  setAccounts(data) {
    let account;
    if (data && data.length > 0) {
      account = data[0];
    }

    this.setState({ accounts: data, account, selectValue: this.getOption(account), isLoaded: true });
  }

  getOption = account => {
    return { value: account.id, label: `${account.info.address} - ${account.info.balance} ${account.blockchain}` };
  };

  handleChooseAccount = e => {
    const { accounts } = this.state;
    this.setState({ account: accounts.find(account => account.id === e.value), selectValue: e });
  };

  onSubmit = payload => {
    const { to, amount, data } = payload;
    const { account } = this.state;

    messaging.send({
      type: TX_CREATE,
      payload: {
        name: account.name,
        tx: {
          to,
          amount,
          data
        }
      }
    });

    window.close();
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
    console.log(this.props, 'props');
    console.log(this.state, 'state');

    //TODO: return loader
    if (!this.state.isLoaded) return null;

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
        <Info labelColor="primary" label="From:" content={[address, `${balance} ${blockchain}`, '? USD']} />
        <Info labelColor="primary" label="To:" content={to} />
        <Divider />
        <Info label="Amount:" center content={[amount / 1e8, 'ETH', '? USD']} />
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
