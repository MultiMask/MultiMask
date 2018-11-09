import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AuthForm from '../../ui/components/NeedAuth/AuthForm';
import profileActions from '../../actions/profile';
import { formToJson } from 'helpers/forms';

class ImportProfile extends Component<any, any> {
  public handleImportProfile = e => {
    e.preventDefault();
    const { profile, handleImport } = this.props;

    const pass = (formToJson(e.target) as any).password;

    handleImport(pass, profile);
  };

  public render () {
    return <AuthForm handleSubmit={this.handleImportProfile} />;
  }
}

export default withRouter(connect(
  ({ profile }: any) => {
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
)(ImportProfile) as any);
