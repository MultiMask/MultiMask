import React from "react";
import moment from "moment";
import axios from "axios";
import FontAwesome from 'react-fontawesome';

import messaging from "../../message";
import networkImg from "../../../helpers/networkImg";
import networkSign from "../../../helpers/networkSign";
import App from '../../../models/app';

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
  }

  render() {
    const { account } = this.props;
    console.log('account', account);

    return (
      <div>
        <div className="item">
          <div className="item_icon">
            {this.image}
          </div>
          <div className="item_info">
            <div className="item_address">
              {account.info.address}
            </div>
            <div className="item_balance">
              {this.balance}
            </div>
          </div>
          <div className="item_net">
            <FontAwesome name="ellipsis-h" />
          </div>
        </div>
        <div className="actions">
          <div className="btn primary">buy</div>
          <div className="btn primary">send</div>
        </div>
      </div>
    );

    return null;
  }
}
