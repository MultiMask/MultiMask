import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { css } from 'emotion';
import styled from 'react-emotion';
import CopyToClipboard = require('react-copy-to-clipboard');
import { getCurrentWallet } from './../../select';

import ntx, { BCSign } from 'bcnetwork';
import { IWalletInfo } from 'types/accounts';
import { openUrlToTab, LinkTypes } from 'helpers/links';

import TXList from './common/TXList';
import Wallet from './common/Wallet';
import Menu from '../../ui/Menu';
import MenuItem from '../../ui/MenuItem';
import Button from '../../ui/Button';
import Icon from '../../ui/Icon';

const TXContainer = styled('div')`
  background-color: ${props => props.theme.colors.background};
  flex-grow: 1;
`;

interface IProps extends RouteComponentProps {
  account: IWalletInfo;
}

class AccountInfo extends React.Component<IProps, any> {
  private bcMenuItems () {
    const { account } = this.props;

    switch (account.blockchain) {
      case ntx.EOS.sign: {
        if (!(account.extra && account.extra.account)) {
          return (
            <React.Fragment>
              <MenuItem component={Link} to="/account/assign">
                Assign EOS Account
              </MenuItem>
            </React.Fragment>
          );
        }
      }
    }
  }

  public handleOpenDetails = () => {
    const { account } = this.props;
    const type = account.blockchain === BCSign.EOS ? LinkTypes.Account : LinkTypes.Address;

    openUrlToTab(account, account.info.address, type);
  };

  public render () {
    const { account } = this.props;
    return (
      <React.Fragment>
        <Wallet
          data={account}
          menu={
            <React.Fragment>
              <CopyToClipboard text={account.info.address}>
                <Icon
                  className={css`
                    margin: 0 7px;
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
                {this.bcMenuItems()}
                <MenuItem onClick={this.handleOpenDetails}>View Account</MenuItem>
                <MenuItem component={Link} to="/account/details/qrcodelink">
                  Show QR-code
                </MenuItem>
                {/* <MenuItem component={Link} to="/account/exportpk">
                  Export Private Key
                </MenuItem> */}
              </Menu>
            </React.Fragment>
          }
          actions={
            <div>
              <Button outlined small component={Link} componentProps={{ to: '/account/send' }}>
                Send
              </Button>
            </div>
          }
        />
        <TXContainer>
          <TXList account={account} />
        </TXContainer>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: IPopup.AppState) => ({
    account: getCurrentWallet(state)
  }),
  null
)(AccountInfo);
