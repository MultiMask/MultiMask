import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FontAwesome from "react-fontawesome";

import networkImg from "../../../helpers/networkImg";
import networkSign from "../../../helpers/networkSign";

import txActions from "../../actions/tx";
import { getCurrentWallet } from "./../../select";

class Send extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      to: '',
      amount: '',
      data: ''
    };
  }

  get image() {
    const account = this.props.account;
    return <img src={networkImg(account)} />;
  }

  get balance() {
    const account = this.props.account;
    return `${account.info.balance} ${networkSign(account)}`;
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDone = e => {
    e.preventDefault();
    this.props.createTx(this.formatTX(this.state));
  }

  formatTX({ to, amount, data }) {
    return {
      to, data,
      amount: parseFloat(amount),
    }
  }

  render() {
    const { account } = this.props;

    return <div className="send">
      <div className='balance'>
        <div className="item">
          <div className="item_icon">{this.image}</div>
          <div className="item_info">
            <div className="item_address">{account.info.address}</div>
            <div className="item_balance">{this.balance}</div>
          </div>
        </div>
      </div>
      <div className="send_form grow">
        <form onSubmit={this.handleDone}>
          {/* <div className="tobuy_text">Send Transaction</div> */}
          <div className="inputWrap">
            <label>
              Recipient address
              <input
                name="to"
                value={this.state.to}
                onChange={this.handleInput}
              />
            </label>
          </div>
          <div className="inputWrap">
            <label>
              Amount
              <input
                name="amount"
                value={this.state.amount}
                onChange={this.handleInput}
              />
            </label>
          </div>
          <div className="inputWrap">
            <label>
              Data
            <input
                name="data"
                value={this.state.data}
                onChange={this.handleInput}
              />
            </label>
          </div>
          <button className="center">
            Next
          </button>
        </form>
      </div>
    </div>;
  }
}

export default connect(
  state => ({
    account: getCurrentWallet(state)
  }),
  dispatch => bindActionCreators(txActions, dispatch)
)(Send);
