import * as React from 'react';
import styled from 'react-emotion';
import { BaseContainer } from './BaseContainer';

const Container = styled(BaseContainer)``;

const EmptyLayout: React.SFC<{}> = ({ children }) => <Container>{children}</Container>;
export default EmptyLayout;
