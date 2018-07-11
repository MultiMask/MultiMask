import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import networkSign from '../../../helpers/networkSign';
import BlockchainIcon from '../../ui/components/Icon';
import accountActions from '../../actions/account';
import stateActions from '../../actions/state';
import { getCurrentWallet } from './../../select';
import TXList from './common/TXList';

import Menu from '../../ui/menu';
import MenuItem from '../../ui/MenuItem';
import Typography from '../../ui/Typography';
import Button from '../../ui/Button';
import Icon from '../../ui/Icon';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'react-emotion';
import { css } from 'emotion';

const WalletContainer = styled.div`
  padding: 10px 20px;
  margin-left: 5px;
  background-color: #fff;
`;

const WalletHeader = styled.div`
  display: flex;
  align-items: center;
`;

const WalletContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 10px;
`;

const TXContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  flex-grow: 1;
`;

class AccountInfo extends React.Component {
  state = {
    isViewMenu: false
  };

  handleBuy = () => {
    this.props.buy();
  };

  handleSend = () => {
    this.props.send();
  };

  handleMenu = () => {
    this.setState(state => ({
      ...state,
      isViewMenu: !state.isViewMenu
    }));
  };

  handleExportPK = () => {
    this.props.goExport();
  };

  get image() {
    const account = this.props.account;

    return account.blockchain ? <BlockchainIcon type={account.blockchain} size="s" /> : null;
  }

  get balance() {
    const account = this.props.account;
    return `${account.info.balance} ${networkSign(account)}`;
  }

  render() {
    const account = this.props.account;

    return (
      <React.Fragment>
        <WalletContainer className="item">
          <WalletHeader>
            {this.image}
            <Typography
              className={css`
                padding: 0 12px;
              `}
              color="secondary"
            >
              {account.info.address}
            </Typography>
            <CopyToClipboard text={account.info.address}>
              <Icon
                className={css`
                  margin-right: 7px;
                `}
                name="clone"
                color="secondary"
                button
              />
            </CopyToClipboard>
            <Menu
              className={css`
                margin-left: auto;
              `}
              iconProps={{ color: 'secondary', name: 'ellipsis-h', button: true }}
            >
              <MenuItem>View Account</MenuItem>
              <MenuItem>Show QR-code</MenuItem>
              <MenuItem onClick={this.handleExportPK}>Export Private Key</MenuItem>
            </Menu>
          </WalletHeader>
          <WalletContent>
            <div>
              <Typography
                className={css`
                  display: block;
                  margin-bottom: 5px;
                `}
                color="main"
              >
                {this.balance}
              </Typography>
              <Typography color="secondary">? USDT</Typography>
            </div>
            <div>
              <Button outlined small onClick={this.handleSend}>
                Send
              </Button>
            </div>
          </WalletContent>
        </WalletContainer>
        <TXContainer>
          <TXList data={account} />
        </TXContainer>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    account: getCurrentWallet(state)
  }),
  dispatch =>
    bindActionCreators(
      {
        buy: accountActions.buy,
        send: accountActions.send,
        goExport: stateActions.goExportPK
      },
      dispatch
    )
)(AccountInfo);
