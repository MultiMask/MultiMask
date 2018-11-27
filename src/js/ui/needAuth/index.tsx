import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AuthForm from './AuthForm';
import needAuthActions from 'popup/actions/ui/needauth';
import { formToJson } from 'helpers/forms';

class NeedAuthComp extends React.Component<any, any> {
  private pass;

  public static defaultProps = {
    onSubmit: null
  };

  public componentDidMount () {
    this.props.start();
  }

  public componentWillUnmount () {
    this.props.start();
  }

  public handleSubmit = e => {
    e.preventDefault();

    const json: any = formToJson(e.target);
    this.pass = json.password;

    this.props.check(this.pass);
  };

  public render () {
    const { onSubmit, children, isAuth, error } = this.props;
    if (isAuth) {
      if (onSubmit) {
        onSubmit();
      } else {
        return React.cloneElement(children as any, { pass: this.pass });
      }
    }

    return <AuthForm handleSubmit={this.handleSubmit} error={error} />;
  }
}

export const NeedAuth = connect(
  ({ ui }: any) => ({
    ...ui.needauth
  }),
  dispatch => bindActionCreators(needAuthActions, dispatch)
)(NeedAuthComp) as any;
export default NeedAuth;
