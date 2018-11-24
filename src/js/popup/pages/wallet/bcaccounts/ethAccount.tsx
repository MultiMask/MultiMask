import * as React from 'react';
import styled, { css } from 'react-emotion';

import { IWalletInfo } from 'types/accounts';
import Account from 'app/account';
import Typography from 'ui/Typography';
import Button from 'ui/Button';

interface IProps {
  data: IWalletInfo;
  onImport: (extra: any) => void;
}

interface IState {
  address?: string;
  balance?: number;
  success?: boolean;
}

export class EthAccount extends React.Component<IProps, IState> {
  public render() {
    const { address, balance } = this.props.data.info;

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
    );
  }
}

const NonEmphasis = styled('span')`
  font-weight: normal;
`;
