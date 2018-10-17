import * as React from 'react';
import styled from 'react-emotion';
import DialogLayout from './../popup/layouts/DialogLayout';

export class DomainAccess extends React.Component<any, any> {
  public render () {
    return (
      <DialogLayout>
        <Title>Domain control access</Title>
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
