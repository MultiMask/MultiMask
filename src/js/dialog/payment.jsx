import React from "react";

import messaging from "./message";
import storage from "./../models/storage";
import "../../img/logo.png";

export default class Payment extends React.Component {
  constructor(opts) {
    super(opts);

    this.state = {};

    this.handleTo = this.handleField.bind(this, "to");
    this.handleAmount = this.handleField.bind(this, "amount");
    this.handleData = this.handleField.bind(this, "data");
  }

  handleField = (field, e) => {
    this.setState({ [field]: e.target.value });
  };

  submit = () => {
    this.props.onSubmit(this.props.editable ? this.state : this.props);
  };

  render() {
    const { to, amount, data, onSubmit, onReject, editable } = this.props;

    return (
      <div className="dialog">
        <header className="header">
          <img src="logo.png" />
        </header>
        <div className="dialog-title">
          Send TX with params:
        </div>
        <table className="table">
          <tbody>
            <tr>
              <td>To:</td>
              <td className="value">
                {editable && (
                  <input onChange={this.handleTo} value={this.state.to} />
                )}
                {!editable && <span>{to}</span>}
              </td>
            </tr>
            <tr className="amount">
              <td>Amount:</td>
              <td className="value">
                {editable && (
                  <input
                    onChange={this.handleAmount}
                    value={this.state.amount}
                  />
                )}
                {!editable && (
                  <div>
                    <span className="value">{amount / 1e8}</span>
                    <span className="sign">BTC</span>
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>Data:</td>
              <td className="value">
                {editable && (
                  <input onChange={this.handleData} value={this.state.data} />
                )}
                {!editable && <span>{data}</span>}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="actions">
          <div className="btn" onClick={onReject}>
            Reject
          </div>
          <div className="btn primary" onClick={this.submit}>
            Submit
          </div>
        </div>
      </div>
    );
  }
}
