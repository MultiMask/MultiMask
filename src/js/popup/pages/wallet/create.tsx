import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'react-emotion';
import FormLayout from './FormLayout';
import actions from './../../actions/account';

import AccountFactory from './../../../app/account/accountFactory';
import Account from './../../../app/account';

class Wallet extends React.Component<any, any> {
	public account: Account;

	constructor(props) {
		super(props);

		this.state = {
			seed: null
		};
	}

	public componentDidMount() {
		const { blockchain } = this.props;
		
		this.account = AccountFactory.create({ blockchain });
		this.account.init().then(() => {
      this.setState({ seed: this.account.getSeed() });
    })
	}

	public handleSave = e => {
		e.preventDefault();
		this.props.create(this.account.serialize());
	};

	public render() {
		return (
			<FormLayout
				onSubmit={this.handleSave}
				title="Save your Mnemonic Phrase:"
				titleAlign="center"
				onBack={this.props.onBack}
				submitButtonTitle="I saved Seed"
			>
				<Content>{this.state.seed}</Content>
			</FormLayout>
		);
	}
}

export default connect(
	() => ({}),
	dispatch =>
		bindActionCreators(
			{
				create: actions.create
			},
			dispatch
		)
)(Wallet);

const Content = styled('div')`
  font-size: 18px;
  padding: 20px;
  background: #eee;
  border: 1px solid #ddd;
  text-align: center;
  border-radius: 5px;
  word-wrap: break-word;
`;
