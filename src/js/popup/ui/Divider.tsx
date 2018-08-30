import * as React from 'react';
import styled from 'react-emotion';

const Divider = styled('div')`
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.colors.secondary};
  margin: 10px 0;
`;

export default Divider;
