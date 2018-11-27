import React from 'react';
import styled from 'react-emotion';

import { IPropsThemed } from 'config/theme';

interface IProps extends IPropsThemed {
  show: boolean;
}

/**
 * Create Modal element
 */
export const Modal = styled('div')`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(250, 250, 250, 0.8);
  top: 0;
  left: 0;

  display: ${(props: IProps) => (props.show ? 'block' : 'none')};
`;

export default Modal;
