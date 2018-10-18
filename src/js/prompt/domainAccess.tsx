import * as React from 'react';
import styled from 'react-emotion';
import DialogLayout from './../popup/layouts/DialogLayout';
import { Prompt } from 'models/Prompt';

import Icon from 'ui/components/Icon';
import Button from 'ui/Button';

// interface IState =

interface IProps {
  prompt: Prompt;
}

export class DomainAccess extends React.Component<IProps, any> {
  public componentDidMount () {
    console.log(this.props.prompt);
  }

  private getIcon = account => {
    return account.blockchain ? <Icon type={account.blockchain} /> : null;
  };

  public renderSingleAccount = (account: WalletInfo) => {
    return (
      <label key={account.id} className="Wallet">
        <Input type="checkbox" name={account.id} />
        <div className="Wallet-Inner">
          <div className="Wallet-Icon">{this.getIcon(account)}</div>
          <div className="Wallet-Info">
            <div className="Wallet-Address" title={account.info.address}>
              {account.info.address}
            </div>
            <div className="Wallet-Balance">{account.info.balance}</div>
            <div className="Wallet-Balance-USD"> USD</div>
          </div>
        </div>
      </label>
    );
  };

  private handleSubmit = e => {
    e.preventDefault();
  };

  public render () {
    return (
      <DialogLayout>
        <Title>
          Select accounts to this domain: <b>{this.props.prompt.domain}</b>
        </Title>
        <form onSubmit={this.handleSubmit}>
          <List>{this.props.prompt.data.map(account => this.renderSingleAccount(account))}</List>
          <Actions>
            <Button>Block</Button>
            <Button type="submit">Allow</Button>
          </Actions>
        </form>
      </DialogLayout>
    );
  }
}

const Title = styled('div')`
  padding: 10px;
  font-size: 110%;
  text-align: center;
`;

const List = styled('div')`
  padding: 0 20px;
`;

const Input = styled('input')`
  margin-right: 10px;
  margin-top: 11px;
`;

const Actions = styled('div')`
  display: flex;
  justify-content: space-around;
`;
