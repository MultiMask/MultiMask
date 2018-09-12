import * as React from 'react';
import { connect } from 'react-redux';

import ChooseNetwork from './chooseNetwork';
import CreateWallet from './create';
import ImportWallet from './import';

import TypeImportingStep from './TypeImportingStep';

class WalletCreate extends React.Component<any, any> {
	public state = {
		type: '',
		step: null,
	};

	public onNext = () => {
		const { step } = this.state;

		this.setState({ step });
	};

	public handleChooseTypeImporting = type => {
		this.setState({ type });
	};

	public handleChange = event => {
		this.setState({ step: event.target.value });
	};

	public goBack = () => {
		this.setState({ type: '' });
	};

	public render() {
		if (this.state.type === 'create') {
			return (
				<ChooseNetwork onBack={this.goBack}>
					<CreateWallet />
				</ChooseNetwork>
			);
		}

		if (this.state.type === 'import') {
			return (
				<ChooseNetwork onBack={this.goBack}>
					<ImportWallet />
				</ChooseNetwork>
			);
		}

		return <TypeImportingStep onSubmit={this.handleChooseTypeImporting} />;
	}
}

export default connect()(WalletCreate);
