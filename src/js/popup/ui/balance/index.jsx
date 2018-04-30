import React from "react";
import moment from "moment";
import axios from "axios";

import App from '../../../models/app';
import messaging from "../../message";

import Item from './item';

export default class Balance extends React.Component {

  constructor(opts) {
    super(opts);

    this.state = {
        loading: false,
    }
  }

  componentDidMount() {
    this.setState({loading: true});
    messaging.send({
      type: 'account:info'
    })

    messaging.on('account:info:result', data => {
      this.setState(state => ({
        ...state,
        loading: false,
        response: true,
        data
      }))
    });
  }

  getItems() {
    if (this.state.data && this.state.data.length > 0) {
      return this.state.data.map(accInfo => {
        return <Item account={accInfo}/>;
      })
    }

    return null;
  }

  render() {
    if (this.state.response) {  
      return (
        <div className="balance">
          {this.getItems()}
        </div>
      );
    }

    return (
      <div>Loading...</div> 
    );
  }
}
