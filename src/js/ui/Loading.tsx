import * as React from 'react';
import styled from 'react-emotion';
import FA from 'react-fontawesome';

import { IPropsThemed } from 'config/theme';

const Icon = styled(FA)`
  font-size: 400%;
  color: ${(props: IPropsThemed) => props.theme.colors.multi};
`;
const Wrapper = styled('div')`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loading: React.SFC<any> = ({ children }) => (
  <Wrapper>
    <Icon name="spinner" spin />
  </Wrapper>
);

export default Loading;
