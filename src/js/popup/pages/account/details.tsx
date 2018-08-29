import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { css } from 'emotion';
import styled from 'react-emotion';
import CopyToClipboard = require('react-copy-to-clipboard');

import accountActions from '../../actions/account';
import stateActions from '../../actions/state';
import { getCurrentWallet } from './../../select';

import TXList from './common/TXList';
import Wallet from './common/Wallet';
import Menu from '../../ui/Menu';
import MenuItem from '../../ui/MenuItem';
import Button from '../../ui/Button';
import Icon from '../../ui/Icon';

const TXContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  flex-grow: 1;
`;

class AccountInfo extends React.Component<any, any> {
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

  render() {
    const { account, settings } = this.props;

    return (
      <React.Fragment>
        <Wallet
          data={account}
          menu={
            <React.Fragment>
              <CopyToClipboard text={account.info.address}>
                <Icon
                  className={css`
                    margin-right: 7px;
                  `}
                  name="clone"
                  color="secondary"
                />
              </CopyToClipboard>
              <Menu
                className={css`
                  margin-left: auto;
                `}
                iconProps={{ color: 'secondary', name: 'ellipsis-h' }}
              >
                <MenuItem>View Account</MenuItem>
                <MenuItem>Show QR-code</MenuItem>
                <MenuItem onClick={this.handleExportPK}>Export Private Key</MenuItem>
              </Menu>
            </React.Fragment>
          }
          actions={
            <div>
              <Button outlined small onClick={this.handleSend}>
                Send
              </Button>
            </div>
          }
          settings={settings}
        />
        <TXContainer>
          <TXList data={account} />
        </TXContainer>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: any) => ({
    account: getCurrentWallet(state),
    settings: state.settings
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
