import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'react-emotion';
import { css } from 'emotion';
import TextField from '../../ui/TextField';
import Button from '../../ui/Button';
import Wallet from './common/Wallet';

import txActions from '../../actions/tx';
import { getCurrentWallet } from './../../select';
import Typography from '../../ui/Typography';

const Form = styled.form`
  background-color: ${props => props.theme.colors.background};
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

class Send extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      to: '',
      amount: '',
      data: '',
      errors: {}
    };
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDone = event => {
    event.preventDefault();

    const errors = this.validate(this.state);

    if (Object.keys(errors).length === 0) {
      this.props.createTx(this.formatTX(this.state));
    } else {
      this.setState({ errors });
    }
  };

  formatTX({ to, amount, data }) {
    return {
      to,
      data,
      amount: parseFloat(amount) * 1e8
    };
  }

  validate = values => {
    const errors = {};

    if (!values.to) {
      errors.to = 'Required';
    }
    if (!values.amount) {
      errors.amount = 'Required';
    }

    return errors;
  };

  render() {
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
          <Typography
            variant="subheading"
            color="main"
            className={css`
              margin-bottom: 10px;
            `}
          >
            Send transaction
          </Typography>
          <TextField
            label="Recipient address"
            type="text"
            name="to"
            onChange={this.handleInput}
            value={to}
            error={toError}
          />
          <TextField
            label="Amount"
            type="text"
            name="amount"
            onChange={this.handleInput}
            value={amount}
            error={amountError}
          />
          <Typography
            variant="subheading"
            color="main"
            className={css`
              margin-bottom: 10px;
            `}
          >
            Transaction data (optional)
          </Typography>
          <TextField label="Data" type="text" name="data" onChange={this.handleInput} value={data} />
          <Button>Next</Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    account: getCurrentWallet(state)
  }),
  dispatch => bindActionCreators(txActions, dispatch)
)(Send);
