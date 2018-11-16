import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'react-emotion';
import { css } from 'emotion';

import txActions from '../../actions/tx';
import priceActions from '../../actions/prices';
import { getCurrentWallet } from './../../select';

import Wallet from './common/Wallet';
import Button from '../../ui/Button';
import TextField from '../../ui/TextField';
import Typography from '../../ui/Typography';

class Send extends React.Component<any, any> {
  constructor (props) {
    super(props);

    this.state = {
      to: '',
      amount: '',
      data: '',
      errors: {}
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
        id: this.props.account.id
      });
    } else {
      this.setState({ errors });
    }
  };

  public formatTX ({ to, amount, data }: any) {
    return {
      to,
      data,
      amount: parseFloat(amount)
    };
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
    const { account } = this.props;
    const {
      errors: { to: toError, amount: amountError },
      to,
      amount,
      data
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
              value={`${this.props.getPrice(amount, account.blockchain)} USD`}
              readOnly
            />
          </div>
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
  (state: any) => ({
    account: getCurrentWallet(state)
  }),
  dispatch =>
    bindActionCreators(
      {
        ...txActions,
        ...priceActions
      },
      dispatch
    )
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
