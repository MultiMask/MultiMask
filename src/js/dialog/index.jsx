import React from "react";

import messaging from "./message";

import {
  ACCOUNT_INFO,
  ACCOUNT_INFO_RESULT
} from './../constants/account';

import {
  TX_PAYMENT_GET,
  TX_PAYMENT_RESULT,
  TX_CREATE
} from './../constants/tx';

import Payment from "./payment";

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
    this.setState({ [e.target.name]: e.target.value })
  }

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
        return <option value={account.name} key={idx}>{account.info.address} - {account.info.balance}</option>;
      });
    }

    return null;
  }

  render() {
    // console.log(this.props);
    // console.log(this.state);
    return (
      <div className="dialog">
        {this.state.isLoaded && (
          <div>
            <header className="header">
              <img src="logo.png" />
            </header>

            <div className="dialog-title">
              Select wallet:
            </div>
            <div className="center">
              <select
                name="account"
                value={this.state.account}
                onChange={this.chooseAccount}
              >
                {this.options}
              </select>
            </div>

            <div className="dialog-title">
              Send TX with params:
            </div>
            <Payment
              tx={this.state.tx}
              editable={this.state.isNew}
              onSubmit={this.onSubmit}
              onReject={this.onReject}
            />

          </div>
        )}
      </div>
    );
  }
}
