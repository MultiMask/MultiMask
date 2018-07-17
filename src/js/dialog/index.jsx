import React from 'react';
import { css } from 'emotion';
import messaging from './message';
import { ACCOUNT_INFO, ACCOUNT_INFO_RESULT } from './../constants/account';
import { TX_PAYMENT_GET, TX_PAYMENT_RESULT, TX_CREATE } from './../constants/tx';
import Payment from './payment';
import AuthLayout from '../popup/layouts/AuthLayout';
import Typography from '../popup/ui/Typography';
import Select from '../popup/ui/Select';

export default class App extends React.Component {
  constructor(opts) {
    super(opts);

    this.state = {
      isLoaded: false,
      tx: {}
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
      tx: data.tx,
      isLoaded: true
    }));
  }

  setAccounts(data) {
    let account;
    if (data && data.length > 0) {
      account = data[0].name;
    }

    this.setState({ accounts: data, account });
  }

  chooseAccount = e => {
    this.setState({ account: e.target.value });
  };

  onSubmit = payload => {
    const { to, amount, data } = payload;
    const { account } = this.state;

    messaging.send({
      type: TX_CREATE,
      payload: {
        name: account,
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
        return { value: account.name, label: `${account.info.address} - ${account.info.balance}` };
      });
    }

    return [];
  }

  render() {
    // console.log(this.props);
    // console.log(this.state);

    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ];

    return (
      <AuthLayout>
        {this.state.isLoaded && (
          <React.Fragment>
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
                variant="title"
              >
                Select wallet:
              </Typography>
              <Select options={options} onChange={this.chooseAccount} />
            </div>
            <Typography color="main" variant="title">
              Send TX with params:
            </Typography>
            <Payment
              tx={this.state.tx}
              account={this.state.accounts}
              editable={this.state.isNew}
              onSubmit={this.onSubmit}
              onReject={this.onReject}
            />
          </React.Fragment>
        )}
      </AuthLayout>
    );
  }
}
