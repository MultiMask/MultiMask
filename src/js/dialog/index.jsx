import React from "react";

import messaging from "./message";
import storage from "./../models/storage";

import Payment from "./payment";

export default class App extends React.Component {
  constructor(opts) {
    super(opts);

    this.state = {
      isLoaded: false
    };
  }

  componentDidMount() {
    messaging.send({
      type: "payment_init"
    });

    messaging.on("payment_tx", data => {
      this.setTxInfo(data);
    });
  }

  setTxInfo(data) {
    this.setState(state => ({
      ...state,
      ...data,
      isLoaded: true
    }));
  }

  onSubmit = payload => {
    const { to, amount, data } = payload;

    const { id } = this.state;
    messaging.send({
      type: "payment_submit",
      payload: {
        id,
        to,
        amount,
        data
      }
    });
    window.close();
  };

  onReject = () => {
    window.close();
  };

  render() {
    return (
      <div>
        {this.state.isLoaded && (
          <Payment
            to={this.state.to}
            amount={this.state.amount}
            data={this.state.data}
            editable={this.state.isNew}
            onSubmit={this.onSubmit}
            onReject={this.onReject}
          />
        )}
      </div>
    );
  }
}
