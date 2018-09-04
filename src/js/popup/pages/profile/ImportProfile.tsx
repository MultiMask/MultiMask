import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AuthForm from '../../ui/components/NeedAuth/AuthForm';
import profileActions from '../../actions/profile';
import { formToJson } from '../../helpers';

class ImportProfile extends Component<any, any> {
  handleImportProfile = e => {
    e.preventDefault();
    const { profile, handleImport } = this.props;

    const pass = formToJson(e.target)['password'];

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
