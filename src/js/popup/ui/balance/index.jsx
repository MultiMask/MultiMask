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

class Balance extends React.Component {

  constructor(props) {
    super(props);
    const { dispatch } = props;

    this.actions = bindActionCreators(actions, dispatch);

    // console.log('acttion', this.actions);

    this.state = {
      loading: false,
    }
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.actions.getInfo();

    messaging.on('account:info:result', data => {
      this.setState(state => ({
        ...state,
        loading: false,
        response: true,
        data
      }))
    });
  }

  chooseWallet = (walletName) => {
    console.log('walletName', walletName);
    this.setState({ choosenWallet: walletName });
  }

  get items() {
    if (this.state.data && this.state.data.length > 0) {
      return this.state.data.map(accInfo => {
        return <Item account={accInfo} key={accInfo.name} onChoose={this.chooseWallet} />;
      })
    }

    return null;
  }

  get choosenAccount() {
    const { choosenWallet, data } = this.state;

    return data.find(acc => acc.name === choosenWallet);
  }

  render() {
    console.log('state', this.state);
    console.log('props', this.props);

    if (this.state.choosenWallet) {
      return (
        <div className="balance">
          <Details account={this.choosenAccount} />
        </div>
      );
    }

    if (this.state.response) {
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
  null,
)(Balance);
