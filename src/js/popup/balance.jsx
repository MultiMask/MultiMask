import React from "react";
import moment from "moment";
import axios from "axios";

import messaging from "./message";

export default class Balance extends React.Component {

  constructor(opts) {
    super(opts);

    this.state = {}
  }

  componentDidMount() {
    messaging.send({
      type: 'wallet_info'
    })

    messaging.on('wallet_info_result', (data) => {
      this.setState(state => ({
        ...state,
        ...data
      }))
    });
  }

  onSendClick = () => {
    if (this.props.onSend) {
      this.props.onSend();
    }
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
}
