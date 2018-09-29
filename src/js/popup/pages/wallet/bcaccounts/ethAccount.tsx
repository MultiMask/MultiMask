import * as React from 'react';
import styled, { css } from 'react-emotion';

import Account from 'app/account';
import Typography from 'ui/Typography';
import Button from 'ui/Button';

interface IProps {
  account: Account;
  onImport: (extra: any) => void;
}

interface IState {
  address?: string;
  balance?: string;
  success?: boolean;
}

export class EthAccount extends React.Component<IProps, IState> {

  public state: IState = {}

  public componentDidMount () {
    this.getInfo();
  }

  private getInfo () {
    const {account} = this.props;

    if (account) {
      account.getInfo().then(data => {
        this.setState({
          address: data.info.address,
          balance: data.info.balance,
          success: true
        });
      });
    }
  }

  public render () {
    const {address, balance, success } = this.state;

    if (!success) {
      return null;
    }

    return (
      <React.Fragment>
          <div>
            <Typography variant="subheading" color="main">
              <NonEmphasis>Account:</NonEmphasis> {address}
            </Typography>
            <Typography variant="subheading" color="main">
              <NonEmphasis>Balance:</NonEmphasis> {balance}
            </Typography>
          </div>
          <Button
            className={css`
              margin-top: 50px;
            `}
            onClick={this.props.onImport}
          >
            Import
          </Button>
        </React.Fragment>
    )
  }
}

const NonEmphasis = styled('span')`
  font-weight: normal;
`;
