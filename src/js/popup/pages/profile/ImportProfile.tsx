import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import AuthForm from '../../ui/components/NeedAuth/AuthForm';
import profileActions from '../../actions/profile';
import { formToJson } from 'helpers/forms';

class ImportProfile extends Component<any, {}> {
  public handleImportProfile = e => {
    e.preventDefault();
    const { profile, handleImport } = this.props;

    const pass = (formToJson(e.target) as any).password;

    handleImport(pass, profile);
  };

  public render() {
    return <AuthForm handleSubmit={this.handleImportProfile} />;
  }
}

export default withRouter(connect(
  ({ profile }: IPopup.AppState) => {
    return {
      profile: profile.onImport
    };
  },
  {
    handleImport: profileActions.import
  }
)(ImportProfile) as any);
