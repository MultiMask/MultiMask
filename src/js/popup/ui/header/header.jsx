import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';

import { STATE_VIEW_MAIN } from '../../../constants/state';

import stateActions from '../../actions/state';
import authAction from '../../actions/auth';

class Header extends React.Component {
  handleBack = () => {
    this.props.goBack();
  };

  get showBack() {
    return this.props.view !== STATE_VIEW_MAIN;
  }

  render() {
    return (
      <div className="header">
        {this.showBack && (
          <div className="header_back">
            <FontAwesome name="chevron-left" onClick={this.handleBack} />
          </div>
        )}
        {!this.props.creation && (
          <div className="header_add">
            <FontAwesome name="plus-circle" onClick={this.props.createWallet} />
            <FontAwesome name="sign-out-alt" onClick={this.props.logout} />
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  ({ state }) => ({
    view: state.view
  }),
  dispatch => bindActionCreators({ ...stateActions, ...authAction }, dispatch)
)(Header);
