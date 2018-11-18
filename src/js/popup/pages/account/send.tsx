import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { css } from 'emotion';
import web3 = require('web3');

import txActions from '../../actions/tx';
import priceActions from '../../actions/prices';
import { getCurrentWallet } from './../../select';

import Wallet from './common/Wallet';
import Button from '../../ui/Button';
import TextField from '../../ui/TextField';
import Typography from '../../ui/Typography';
import { IWalletInfo } from 'types/accounts';
import { getTotalGas } from 'helpers/eth';

const actions = {
  ...txActions,
  ...priceActions
};
type IPropsActions = Actions<typeof actions>;
interface IProps extends IPropsActions {
  account: IWalletInfo;
}

interface IState {
  to?: string;
  amount?: string;
  data?: string;
  errors?: any;
  gasPrice?: number;
  gasLimit?: number;
}

class Send extends React.Component<IProps, IState> {
  constructor (props) {
    super(props);

    this.state = {
      to: '',
      amount: '',
      data: '',
      errors: {},
      gasPrice: 5,
      gasLimit: 21000
    };
  }

  public handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  public handleDone = event => {
    event.preventDefault();

    const errors = this.validate(this.state);

    if (Object.keys(errors).length === 0) {
      this.props.createTx({
        tx: this.formatTX(this.state),
        key: this.props.account.key
      });
    } else {
      this.setState({ errors });
    }
  };

  public formatTX ({ to, amount, data, gasPrice, gasLimit }: any) {
    const {
      account: { blockchain }
    } = this.props;
    switch (blockchain) {
      case 'ETH':
        return {
          to,
          data,
          amount: parseFloat(amount),
          gasPrice,
          gasLimit
        };

      default:
        return {
          to,
          data,
          amount: parseFloat(amount)
        };
    }
  }

  public validate = values => {
    const errors: any = {};

    if (!values.to) {
      errors.to = 'Required';
    }
    if (!values.amount) {
      errors.amount = 'Required';
    }

    return errors;
  };

  public render () {
    const { account, getPrice } = this.props;
    const {
      errors: { to: toError, amount: amountError },
      to,
      amount,
      data,
      gasPrice,
      gasLimit
    } = this.state;

    return (
      <React.Fragment>
        <Wallet data={account} />
        <Form onSubmit={this.handleDone}>
          <Typography variant="subheading" color="main" className={styles.title}>
            Send transaction
          </Typography>
          <TextField
            label="Recipient address"
            type="text"
            name="to"
            fullWidth
            onChange={this.handleInput}
            value={to}
            error={toError}
          />
          <div className={styles.rowContainer}>
            <TextField
              label="Amount"
              type="number"
              name="amount"
              onChange={this.handleInput}
              value={amount}
              error={amountError}
            />
            <Typography variant="subheading" color="main" className={styles.sign}>
              =
            </Typography>
            <TextField
              type="text"
              name="usd"
              value={`${this.props.getPrice(+amount, account.blockchain)} USD`}
              readOnly
            />
          </div>
          {/* TODO: make blockchain enum */}
          {account.blockchain === 'ETH' && (
            <React.Fragment>
              <div className={styles.rowContainer}>
                <TextField
                  fullWidth
                  min="1"
                  label="Gas prise"
                  type="number"
                  name="gasPrice"
                  onChange={this.handleInput}
                  value={gasPrice}
                />
                <Typography variant="subheading" color="main" className={styles.sign} />
                <TextField
                  fullWidth
                  label="Gas limit"
                  type="number"
                  name="gasLimit"
                  onChange={this.handleInput}
                  value={gasLimit}
                />
              </div>
              <Typography variant="body1" color="main" className={styles.title}>
                Cost transaction:
                {getPrice(getTotalGas(gasPrice, gasLimit), account.blockchain)} USD
              </Typography>
            </React.Fragment>
          )}
          <Typography variant="subheading" color="main" className={styles.title}>
            Transaction data (optional)
          </Typography>
          <TextField fullWidth label="Data" type="text" name="data" onChange={this.handleInput} value={data} />
          <Button className={styles.button}>Next</Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: IPopup.AppState) => ({
    account: getCurrentWallet(state)
  }),
  {
    ...txActions,
    ...priceActions
  }
)(Send);

const Form = styled('form')`
  background-color: ${props => props.theme.colors.background};
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const styles = {
  title: css`
    margin-bottom: 10px;
    width: 100%;
    margin-top: 0;
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
