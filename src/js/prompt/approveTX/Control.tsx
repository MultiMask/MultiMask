import * as React from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';

import { Typography } from 'ui';

const Container = styled('div')`
  display: flex;
  align-items: center;
  padding: 10px 0;
`;

const FirstItem = styled(Typography)`
  flex-shrink: 0;
  margin-right: 10px;
  flex-basis: 60px;
`;

const Input = styled('input')`
  width: 65%;
  outline: none;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #acacac;
  margin-right: 5px;

  &:hover,
  &:active {
    border-color: #1888fe;
  }
`;

const Content = styled('div')`
  display: flex;
  flex-grow: 1;
  align-items: center;
`;

const Control: React.SFC<any> = ({ label, secondLabel, value, onChange }) => {
  const input = <Input type="number" value={value} onChange={onChange} />;

  return (
    <Container>
      <FirstItem color="primary">{label}</FirstItem>
      <Content>
        {input}
        <Typography>{secondLabel}</Typography>
      </Content>
    </Container>
  );
};

Control.defaultProps = {};

export default Control;
