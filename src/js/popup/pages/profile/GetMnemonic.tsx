import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { withRouter, RouteComponentProps } from 'react-router';

import Typography from 'ui/Typography';
import SeedView from 'ui/SeedView';

import profileActions from 'popup/actions/profile';

const actions = {
  ...profileActions
};
type IPropsActions = Actions<typeof actions>;
interface IProps extends IPropsActions, RouteComponentProps<any> {
  onBack(): void;
}

class ExportSeed extends React.Component<IProps, any> {
  public state = {
    seed: ''
  };

  public componentDidMount() {
    const {
      getProfileSeed,
      match: {
        params: { id }
      }
    } = this.props;

    getProfileSeed(id).then(({ payload: { seed } }) => {
      this.setState({ seed });
    });
  }

  public render() {
    return (
      <Container>
        <Typography align="center" color="main" variant="title">
          Your mnemonic
        </Typography>
        <SeedView>{this.state.seed}</SeedView>
      </Container>
    );
  }
}

export default withRouter(connect(
  null,
  actions
)(ExportSeed as any) as any);

const Container = styled('div')`
  padding: 20px;
`;
