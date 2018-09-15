import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import styled from 'react-emotion';
import CopyToClipboard = require('react-copy-to-clipboard');
import accountActions from '../../actions/account'
import { getCurrentWallet } from './../../select';

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

class AccountInfo extends React.Component<any, any> {
	public render() {
		const { account, settings, changeNetwork } = this.props;
		return (
			<React.Fragment>
				<Wallet
					data={account}
					changeNetwork={changeNetwork}
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
		account: getCurrentWallet(state)
	}),
	dispatch => bindActionCreators(accountActions, dispatch)
)(AccountInfo);
