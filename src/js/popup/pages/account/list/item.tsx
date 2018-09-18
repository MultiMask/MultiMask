import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getPrice from '../../../../helpers/getPrice';
import networkSign from '../../../../helpers/networkSign';
import accountActions from '../../../actions/account';
import Icon from '../../../ui/components/Icon';

class AccountFastView extends React.Component<any, any> {
	get image() {
		const { account } = this.props;

		return account.blockchain ? <Icon type={account.blockchain} /> : null;
	}

	get balance() {
		const { account } = this.props;
		return `${account.info.balance} ${networkSign(account)}`;
	}

	public handleClick = () => {
		const { account, setActive } = this.props;

		setActive(account.name);
	};

	public render() {
		const { account, prices } = this.props;

		return (
			<div className="Wallet" onClick={this.handleClick}>
				<div className="Wallet-Inner">
					<div className="Wallet-Icon">{this.image}</div>
					<div className="Wallet-Info">
						<div className="Wallet-Address" title={account.info.address}>
							{account.info.address}
						</div>
						<div className="Wallet-Balance">{this.balance}</div>
						<div className="Wallet-Balance-USD">{getPrice(prices, account.blockchain, account.info.balance)} USD</div>
					</div>
					<div className="Wallet-Network">{account.info.network}</div>
				</div>
			</div>
		);
	}
}

export default connect(
	null,
	dispatch => bindActionCreators(accountActions, dispatch)
)(AccountFastView);
