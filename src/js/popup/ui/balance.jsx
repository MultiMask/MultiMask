import React from "react";
import moment from "moment";
import axios from "axios";

import messaging from "../message";

import App from '../../models/app';

export default class Balance extends React.Component {

  constructor(opts) {
    super(opts);

    this.state = {}
  }

  componentDidMount() {
    messaging.send({
      type: 'account:info'
    })

    messaging.on('account:info:result', data => {
      this.setState(state => ({
        ...state,
        data
      }))
    });
  }

  hasAccount() {
    return !!this.state.data;
  }

  onSendClick = () => {
    messaging.send({
      type: "tx_create"
    });
  };

  // transactions() {
  //   const history = golos.history.slice().reverse();

  //   return history.map(([key, trans], idx) => {
  //     return (
  //       <tr key={idx}>
  //         <td>{moment(trans.timestamp).format()}</td>
  //         <td>
  //           <div>{trans.op[0]}</div>
  //           <div>
  //             {trans.op[1].from} -> {trans.op[1].to}
  //           </div>
  //         </td>
  //         <td>{trans.op[1].amount}</td>
  //         <td>{trans.op[1].memo}</td>
  //       </tr>
  //     );
  //   });
  // }

  render() {
    console.log(this.state);

    if (this.hasAccount()) {  
      return (
        <div className="balance">
          <header className="balance__header" />
          <main className="balance__content">
            <div className="balance__logo">
              <span>B</span>
            </div>
            <div className="balance__data">
              <div className="balance__address">
                {this.state.address}
              </div>
              <div className="balance__value">
                <span className="value">{this.state.balance / 1e8}</span>
                <span className="sign">BTC</span>
              </div>
            </div>
          </main>
          <div className="balance__actions">
            <div className="btn" onClick={this.onSendClick}>
              send
            </div>
          </div>
        </div>
      );
    }

    return null;
  }
}
