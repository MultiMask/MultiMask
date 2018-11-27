import * as React from 'react';
import { connect } from 'react-redux';

import { BCSign } from 'bcnetwork';
import accountActions from 'popup/actions/account';
import Loading from 'ui/Loading';

const actions = {
  create: accountActions.create
};

type Props = typeof actions;
interface IProps extends Props, React.Props<{}> {
  blockchain?: BCSign;
}
class CreateWallet extends React.Component<IProps, {}> {
  public componentDidMount () {
    this.props.create(this.props.blockchain);
  }

  public render () {
    return <Loading />;
  }
}

export default connect(
  null,
  actions
)(CreateWallet);
