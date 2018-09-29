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
  eos?: any[];
  success?: boolean;
}

export class EosAccount extends React.Component<IProps, IState> {

  public state: IState = {}

  public componentDidMount () {
    this.getInfo();
  }

  private getInfo () {
    const { account } = this.props;

    account.wallet.getKeyAccounts()
      .then(accounts => {
        this.setState(state => ({
          ...state,
          success: true,
          eos: accounts
        }))
      })
  }

  public render () {
    const { success, eos } = this.state;

    if (!success) {
      return null;
    }

    if (success) {
      return eos.map((account, idx) => {
        const handle = () => this.props.onImport(account);

        return (
          <React.Fragment key={idx}>

            <div>
              <Typography variant="subheading" color="main">
                <NonEmphasis>Account:</NonEmphasis> {account.account_name}
              </Typography>
              <Typography variant="subheading" color="main">
                <NonEmphasis>Balance:</NonEmphasis> {account.core_liquid_balance}
              </Typography>
              {/* <Typography color="secondary">{account.core_liquid_balance}</Typography> */}
          </div>
          <Button
            className={css`
              margin-top: 50px;
            `}
            onClick={handle}
          >
            Import
          </Button>
        </React.Fragment>
        );
      });
    }
  }
}

const NonEmphasis = styled('span')`
  font-weight: normal;
`;
