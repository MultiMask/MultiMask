import * as React from 'react';
import styled from 'react-emotion';

import DialogLayout from 'popup/layouts/DialogLayout';
import { Prompt } from 'models/Prompt';
import { processForm } from 'helpers/forms';

import Icon from 'ui/components/Icon';
import Button from 'ui/Button';

const INPUT_NAME = 'accounts';

interface IProps {
  prompt: Prompt;
}

export class DomainAccess extends React.Component<IProps, any> {
  private getIcon = account => {
    return account.blockchain ? <Icon type={account.blockchain} /> : null;
  };

  public renderSingleAccount = (account: WalletInfo) => {
    const permissions: string[] = this.props.prompt.data.permissions || [];

    return (
      <label key={account.id} className="Wallet">
        <Input type="checkbox" name={INPUT_NAME} value={account.id} defaultChecked={permissions.includes(account.id)} />
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
    const data = processForm(e);
    this.props.prompt.responder({
      accounts: data[INPUT_NAME],
      allowed: true
    });
    window.close();
  };

  private handleDeny = e => {
    e.preventDefault();
    this.props.prompt.responder({
      allowed: false
    });
    window.close();
  };

  public render () {
    return (
      <DialogLayout>
        <Title>
          Select accounts to this domain: <b>{this.props.prompt.domain}</b>
        </Title>
        <form onSubmit={this.handleSubmit}>
          <List>{this.props.prompt.data.accounts.map(account => this.renderSingleAccount(account))}</List>
          <Actions>
            <Button onClick={this.handleDeny}>Block</Button>
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
