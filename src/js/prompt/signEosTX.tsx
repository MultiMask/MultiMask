import * as React from 'react';
import styled from 'react-emotion';

import Button from '../popup/ui/Button';
import DialogLayout from './../popup/layouts/DialogLayout';

export class SignEosTX extends React.Component<any, any> {
  
  public handleOnSubmit = () => {
    this.props.prompt.responder({success: true});
    window.close();
  }

  public handleOnReject = () => {
    this.props.prompt.responder({success: false});
    window.close();
  }

  public renderMessages () {
    return this.props.prompt.data.messages.map((msg, idx) => {
      return <div key={idx}>
        <h3>
          {msg.code}:{msg.type}
        </h3>
        <dl>
          {Object.keys(msg.data).map(key => {
            return <React.Fragment key={key}>
              <dt>{key}</dt>
              <dd>{msg.data[key]}</dd>
            </React.Fragment>
          })}
        </dl>
      </div>
    })
  }
  
  public render () {
    return (
      <DialogLayout>
        <div>
          {this.renderMessages()}
        </div>
        <Actions>
          <Button large outlined onClick={this.handleOnReject}>
            Reject
          </Button>
          <Button large onClick={this.handleOnSubmit}>
            Submit
          </Button>
        </Actions>
      </DialogLayout>
    )
  }
}

const Actions = styled('div')`
  display: flex;
  margin: 20px 20px 0 20px;
  justify-content: space-between;
`;
