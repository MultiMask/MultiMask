import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AuthForm from '../../ui/components/NeedAuth/AuthForm';
import profileActions from './../../actions/profile';
import { formToJson } from '../../helpers/index';

class ImportProfile extends Component {
  handleImportProfile = e => {
    e.preventDefault();
    const { profile, handleImport } = this.props;

    const json = formToJson(e.target);
    const pass = json.password;

    handleImport(pass, profile);
  };

  render() {
    return <AuthForm handleSubmit={this.handleImportProfile} />;
  }
}

export default withRouter(
  connect(
    ({ profile }) => {
      console.log(profile, 'state');
      return {
        profile: profile.importProfile
      };
    },
    dispatch =>
      bindActionCreators(
        {
          handleImport: profileActions.import
        },
        dispatch
      )
  )(ImportProfile)
);
