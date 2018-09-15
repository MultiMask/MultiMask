import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'react-emotion';
import { css } from 'emotion';
import Button from '../../ui/Button';
import Select from '../../ui/Select';
import Wallet from './common/Wallet';
import { withRouter } from 'react-router';

import accountActions from '../../actions/account';
import networks from '../../../blockchain';
import { getCurrentWallet } from './../../select';
import Typography from '../../ui/Typography';

const Form = styled('form')`
  background-color: ${props => props.theme.colors.background};
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const styles = {
  title: css`
    margin-bottom: 10px;
    width: 100%;
  `,
  sign: css`
    margin: 0 10px;
    line-height: 40px;
  `,
  rowContainer: css`
    display: flex;
    background-color: inherit;
  `,
  button: css`
    width: 75%;
  `
};

interface ISelectOption {
  value: string;
  label: string;
}

class Edit extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
     selectValue: this.options[0]
    };
  }

  public componentDidMount() {
    const {account } = this.props;

    const currentSelectValue = networks[account.blockchain].network.find(item => item.sign === account.info.network)
    this.setState({selectValue: {value: currentSelectValue.sign, label: currentSelectValue.name}})
  }

  get options() {
    const {account} = this.props
    if (account) {
      return networks[account.blockchain].network.map((network) => {
        return this.getOption(network);
      });
    }
    return [];
  }

  public getOption = (network): ISelectOption => {
    return { value: network.sign, label: network.name };
  };

  public handleSubmit = event => {
    event.preventDefault();
    
    const { 
      changeNetwork,
      match: {
        params: { id }
      }
    } = this.props;

    const {selectValue} = this.state;
    changeNetwork(id, selectValue.value)
  };

  public handleChooseNetwork = e => {
    this.setState({ selectValue: e });
  };

  public render() {
    const { account, settings } = this.props;
    const {
      selectValue
    } = this.state;

    return (
      <React.Fragment>
        <Wallet data={account} settings={settings} />
        <Form onSubmit={this.handleSubmit}>
        <div
          className={css`
            display: flex;
            flex-direction: column;
            width: 100%;
          `}
        >
          <Typography
            className={css`
              margin-right: 10px;
            `}
            color="main"
            variant="subheading"
          >
            Choose network
          </Typography>
          <Select options={this.options} onChange={value => this.handleChooseNetwork(value)} value={selectValue} />
        </div>
          <Button className={styles.button}>Choose</Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default withRouter(connect(
  (state: any) => ({
    account: getCurrentWallet(state),
    settings: state.settings
  }),
  dispatch => bindActionCreators(accountActions, dispatch)
)(Edit));
