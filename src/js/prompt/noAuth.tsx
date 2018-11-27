import * as React from 'react';
import styled from 'react-emotion';
import DialogLayout from 'popup/layouts/DialogLayout';

export class NoAuth extends React.Component<any, any> {
  public render () {
    return (
      <DialogLayout>
        <Title>You need to authorize in MultiMask</Title>
      </DialogLayout>
    );
  }
}

const Title = styled('div')`
  padding: 20px;
  margin-top: 25px;
  color: gray;

  font-size: 150%;
  text-align: center;
`;
