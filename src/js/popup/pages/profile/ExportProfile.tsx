import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import NeedAuth from 'ui/components/NeedAuth';
import profileActions from 'popup/actions/profile';

class ExportProfile extends Component<any, any> {
  public handleExportProfile = () => {
    const {
      handleExport,
      match: {
        params: { id }
      }
    } = this.props;

    handleExport(id);
  };

  public render() {
    return <NeedAuth onSubmit={this.handleExportProfile} />;
  }
}

export default withRouter(connect(
  null,
  {
    handleExport: profileActions.export
  }
)(ExportProfile) as any);
