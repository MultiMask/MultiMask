import React from 'react';
import styled from 'react-emotion';

import { IPropsThemed } from 'config/theme';

export const ModalWrap = styled('div')`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled('div')`
  width: 80%;
  box-sizing: border-box;
  padding: 10px;

  background: white;
  border: 1px solid ${(props: IPropsThemed) => props.theme.colors.secondary};
`;

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
