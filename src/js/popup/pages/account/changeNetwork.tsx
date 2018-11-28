import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'react-emotion';
import { css } from 'emotion';
import Wallet from './common/Wallet';
import { withRouter } from 'react-router';

import accountActions from 'popup/actions/account';
import networks, { getBcNet } from 'bcnetwork';
import { getCurrentWallet } from 'popup/select';

import { Button, Select, Typography } from 'ui';

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

class ChangeNetwork extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      selectValue: this.options[0]
    };
  }

  public componentDidMount() {
    const { account } = this.props;

    const currentSelectValue = getBcNet(account.blockchain, account.info.network);
    this.setState({ selectValue: { value: currentSelectValue.sign, label: currentSelectValue.name } });
  }

  get options() {
    const { account } = this.props;
    if (account) {
      return networks[account.blockchain].network.map(network => {
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
      account: { key },
      match: {
        params: { id }
      }
    } = this.props;

    const { selectValue } = this.state;
    changeNetwork(key, selectValue.value);
  };

  public handleChooseNetwork = e => {
    this.setState({ selectValue: e });
  };

  public render() {
    const { account, settings } = this.props;
    const { selectValue } = this.state;

    return (
      <React.Fragment>
        <Wallet data={account} />
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

export default withRouter<any>(
  connect(
    (state: any) => ({
      account: getCurrentWallet(state)
    }),
    dispatch => bindActionCreators(accountActions, dispatch)
  )(ChangeNetwork)
);
