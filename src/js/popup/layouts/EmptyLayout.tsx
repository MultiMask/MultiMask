import * as React from 'react';
import styled from 'react-emotion';
import { BaseContainer } from './BaseContainer';

const Container = styled(BaseContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyLayout: React.SFC<{}> = ({ children }) => <Container>{children}</Container>;
export default EmptyLayout;
