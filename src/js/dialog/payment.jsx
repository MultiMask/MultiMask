import React from 'react';
import styled from 'react-emotion';
import Typography from '../popup/ui/Typography';
import TextField from '../popup/ui/TextField';

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.isBorder && props.theme.colors.secondary};
`;

const FirstItem = styled(Typography)`
  flex-shrink: 0;
  margin-right: 10px;
  flex-basis: 60px;
`;

const Currency = styled(Typography)`
  margin-left: 5px;
`;

export default class Payment extends React.Component {
  constructor(opts) {
    super(opts);

    this.state = {};
  }

  handleField = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submit = () => {
    this.props.onSubmit(this.props.editable ? this.state : this.props.tx);
  };

  render() {
    const { tx, onSubmit, onReject, editable } = this.props;
    const { to, amount, data } = tx;

    return (
      <React.Fragment>
        <RowContainer isBorder={false}>
          <FirstItem color="primary" variant="subheading">
            To:
          </FirstItem>
          {editable && <TextField name="to" onChange={this.handleField} value={this.state.to} />}
          {!editable && (
            <Typography color="secondary" variant="subheading">
              {to}
            </Typography>
          )}
        </RowContainer>
        <RowContainer>
          <FirstItem color="main" variant="subheading">
            Amount:
          </FirstItem>
          {editable && <TextField name="amount" onChange={this.handleField} value={this.state.amount} />}
          {!editable && [
            <Typography key={1} color="secondary" variant="subheading">
              {amount / 1e8}
            </Typography>,
            <Currency key={2} color="secondary">
              ETH
            </Currency>
          ]}
        </RowContainer>

        <RowContainer>
          <FirstItem color="main" variant="subheading">
            Data:
          </FirstItem>
          {editable && <TextField name="Data" onChange={this.handleField} value={this.state.data} />}
          {!editable &&
            data && (
              <Typography color="secondary" variant="subheading">
                {data}
              </Typography>
            )}
        </RowContainer>
      </React.Fragment>
      // <table>
      //   <tbody>
      //     <tr>
      //       <td>
      //         <Typography color="main" variant="subheading">
      //           To:
      //         </Typography>
      //       </td>
      //       <td>
      //         {editable && <input name="to" onChange={this.handleField} value={this.state.to} />}
      //         {!editable && (
      //           <Typography color="secondary" variant="subheading">
      //             {to}
      //           </Typography>
      //         )}
      //       </td>
      //     </tr>
      //     <tr>
      //       <td>
      //         <Typography color="main">Amount:</Typography>
      //       </td>
      //       <td className="value">
      //         {editable && <input name="amount" onChange={this.handleField} value={this.state.amount} />}
      //         {!editable && (
      //           <div>
      //             <Typography color="secondary">{amount / 1e8}</Typography>
      //             <Typography color="secondary">ETH</Typography>
      //           </div>
      //         )}
      //       </td>
      //     </tr>
      //     <tr>
      //       <td>
      //         <Typography color="main">Data:</Typography>
      //       </td>
      //       <td className="value">
      //         {editable && <input name="data" onChange={this.handleField} value={this.state.data} />}
      //         {!editable && <Typography color="secondary">{data}</Typography>}
      //       </td>
      //     </tr>
      //   </tbody>
      // </table>
      // <div className="actions">
      //   <div className="btn" onClick={onReject}>
      //     Reject
      //   </div>
      //   <div className="btn primary" onClick={this.submit}>
      //     Submit
      //   </div>
      // </div>
    );
  }
}
