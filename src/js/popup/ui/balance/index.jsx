import React from "react";
import moment from "moment";
import axios from "axios";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../../actions/balance';

import App from '../../../models/app';
import messaging from "../../message";

import Item from './item';
import Details from './details';
import Buy from './buy';
import Send from './send';

class Balance extends React.Component {

  constructor(props) {
    super(props);
    const { dispatch } = props;

    this.actions = bindActionCreators(actions, dispatch);
    this.state = {}
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.actions.getInfo();
  }

  chooseWallet = (walletName) => {
    this.actions.setActive(walletName);
  }

  get items() {
    if (this.props.accounts && this.props.accounts.length > 0) {
      return this.props.accounts.map(accInfo => {
        return <Item account={accInfo} key={accInfo.name} onChoose={this.chooseWallet} />;
      })
    }

    return null;
  }

  render() {
    console.log('state', this.state);
    console.log('props', this.props);

    if (this.props.buy) {
      return (
        <div className="balance">
          <Buy />
        </div>
      );
    }

    if (this.props.send) {
      return (
        <div className="balance">
          <Send />
        </div>
      );
    }

    if (this.props.wallet) {
      return (
        <div className="balance">
          <Details account={this.choosenAccount} />
        </div>
      );
    }

    if (this.props.accounts !== null) {
      return (
        <div className="balance">
          {this.items}
        </div>
      );
    }

    return (
      <div>Loading...</div>
    );
  }
}

export default connect(
  state => ({
    accounts: state.balance.accounts,
    wallet: state.balance.wallet,
    buy: state.balance.buy,
    send: state.balance.send,
  }),
)(Balance);
