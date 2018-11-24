import * as React from 'react';
import styled, { css } from 'react-emotion';

import Typography from 'ui/Typography';
import Button from 'ui/Button';
import { prettyAccount, IEosAccountPermission } from 'helpers/eos';

interface IState {
  eos?: any[];
  success?: boolean;
  selectedAccount?: string;
}

interface IProps {
  accounts: IEosAccountPermission[];
  onImport: (extra: any) => void;
}

const styles = {
  radio: css`
    margin: 0;
  `
};

export class EosAccount extends React.Component<IProps, IState> {
  public state: IState = {
    selectedAccount: ''
  };

  private handleSave = e => {
    e.preventDefault();

    const account = this.props.accounts.find(acc => prettyAccount(acc) === this.state.selectedAccount);
    this.props.onImport(account);
  };

  private accountViewRender = (account: IEosAccountPermission, idx) => {
    const { selectedAccount } = this.state;

    if (account) {
      return (
        <Container key={idx}>
          <Radio
            type="radio"
            name="account"
            value={prettyAccount(account)}
            onChange={this.handleRadio}
            checked={selectedAccount === prettyAccount(account)}
          />
          <Label>
            <Typography variant="body1" color="main" className={styles.radio}>
              Account:&nbsp;&nbsp;
              <Emphasis>{prettyAccount(account)}</Emphasis> <br />
              Balance:&nbsp;&nbsp;
              <Emphasis>{account.core_liquid_balance}</Emphasis>
            </Typography>
          </Label>
        </Container>
      );
    } else {
      return (
        <Container key={idx}>
          <Radio type="radio" name="account" value={''} onChange={this.handleRadio} checked={selectedAccount === ''} />
          <Label>
            <Typography variant="body1" color="main" className={styles.radio}>
              <Emphasis>Without account</Emphasis>
            </Typography>
          </Label>
        </Container>
      );
    }
  };

  public handleRadio = e => {
    const value = e.target.value;
    this.setState(state => ({ ...state, selectedAccount: value }));
  };

  public render() {
    const emptyAccount = null;
    const accountList = [emptyAccount, ...this.props.accounts];

    return (
      <React.Fragment>
        <Typography variant="title" color="main" align="center">
          Choose your account:
        </Typography>
        {accountList.map(this.accountViewRender)}
        <BtnContainer>
          <Button
            onClick={this.handleSave}
            className={css`
              margin-top: 20px;
            `}
          >
            Import
          </Button>
        </BtnContainer>
      </React.Fragment>
    );
  }
}

const Emphasis = styled('span')`
  font-weight: bold;
`;

const Container = styled('label')`
  display: flex;
  font-size: 13px;
  margin-bottom: 20px;
`;

const Radio = styled('input')``;
const Label = styled('div')`
  margin-left: 10px;
`;
const BtnContainer = styled('div')`
  text-align: center;
`;
