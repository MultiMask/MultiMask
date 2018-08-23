import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import accountActions from '../../actions/account';
import { getCurrentWallet } from './../../select';
import TXList from './common/TXList';
import Wallet from './common/Wallet';
import Menu from '../../ui/Menu';
import MenuItem from '../../ui/MenuItem';
import Button from '../../ui/Button';
import Icon from '../../ui/Icon';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'react-emotion';
import { css } from 'emotion';

const TXContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  flex-grow: 1;
`;

class AccountInfo extends React.Component {
  state = {
    isViewMenu: false
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
                <MenuItem component={Link} to="/account/exportpk">
                  Export Private Key
                </MenuItem>
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
  state => ({
    account: getCurrentWallet(state),
    settings: state.settings
  }),
  dispatch =>
    bindActionCreators(
      {
        send: accountActions.send
      },
      dispatch
    )
)(AccountInfo);
