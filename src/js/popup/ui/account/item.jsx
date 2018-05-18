import React from "react";

import networkImg from "../../../helpers/networkImg";
import networkSign from "../../../helpers/networkSign";

export default class AccountInfo extends React.Component {
  get image() {
    const { account } = this.props;

    return <img src={networkImg(account)} />;
  }

  get balance() {
    const { account } = this.props;

    return `${account.info.balance} ${networkSign(account)}`;
  }

  handleClick = () => {
    const { account, onChoose } = this.props;

    onChoose(account.name);
  };

  render() {
    const { account } = this.props;
    console.log("account", account);

    return (
      <div className="item list" onClick={this.handleClick}>
        <div className="item_icon">{this.image}</div>
        <div className="item_info">
          <div className="item_address">{account.info.address}</div>
          <div className="item_balance">{this.balance}</div>
        </div>
        <div className="item_net" />
      </div>
    );

    return null;
  }
}
