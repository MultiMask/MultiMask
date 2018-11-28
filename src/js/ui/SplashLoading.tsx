import React from 'react';

import { Modal, Loading } from './';

interface IProps {
  show: boolean;
}

export const Splash: React.SFC<IProps> = ({ show }) => {
  return (
    <Modal show={show}>
      <Loading />
    </Modal>
  );
};
export default Splash;
