import * as React from 'react';
import styled from 'react-emotion';
import FA from 'react-fontawesome';

import { IPropsThemed } from 'config/theme';

const Icon = styled(FA)`
  font-size: 400%;
  color: ${(props: IPropsThemed) => props.theme.colors.multi};
`;
const Wrapper = styled('div')``;

const Loading: React.SFC<any> = ({ children }) => (
  <Wrapper>
    <Icon name="spinner" spin />
  </Wrapper>
);

export default Loading;
