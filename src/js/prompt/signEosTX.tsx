import * as React from 'react';
import styled from 'react-emotion';

import Button from '../popup/ui/Button';
import DialogLayout from './../popup/layouts/DialogLayout';

export class SignEosTX extends React.Component<any, any> {
  public handleOnSubmit = () => {
    this.props.prompt.responder({ success: true });
    window.close();
  };

  public handleOnReject = () => {
    this.props.prompt.responder({ success: false });
    window.close();
  };

  public renderMessages() {
    return this.props.prompt.data.messages.map((msg, idx) => {
      return (
        <Canvas key={idx}>
          <Title>Contract Action</Title>
          <Contract>
            {msg.code} -> {msg.type}
          </Contract>
          <Title>Payload</Title>
          <dl>
            {Object.keys(msg.data).map(key => {
              return (
                <React.Fragment key={key}>
                  <Prop>{key}</Prop>
                  <Value>{msg.data[key]}</Value>
                </React.Fragment>
              );
            })}
          </dl>
        </Canvas>
      );
    });
  }

  public render() {
    return (
      <DialogLayout>
        {this.renderMessages()}
        <Actions>
          <Button large outlined onClick={this.handleOnReject}>
            Reject
          </Button>
          <Button large onClick={this.handleOnSubmit}>
            Submit
          </Button>
        </Actions>
      </DialogLayout>
    );
  }
}

const Actions = styled('div')`
  display: flex;
  margin: 20px 20px 0 20px;
  justify-content: space-between;
`;

const Canvas = styled('div')`
  height: 66%;
  background: rgb(249, 249, 249);
  padding: 1px 20px;
  box-sizing: border-box;
`;

const Title = styled('div')`
  margin-top: 25px;
  color: gray;
  border-bottom: 1px solid rgb(240, 240, 240);
`;

const Contract = styled('h2')`
  color: #707070;
  font-size: 22px;
  font-weight: 500;
`;

const Prop = styled('dt')`
  color: gray;
`;

const Value = styled('dd')`
  margin-bottom: 10px;
  margin-left: 60px;

  font-size: 120%;
  color: #707070;
  font-weight: 500;
`;
