import React from 'react';

import Modal from 'ui/Modal';
import Loading from 'ui/Loading';

interface IProps {
  show: boolean;
}

const Splash: React.SFC<IProps> = ({ show }) => {
  return (
    <Modal show={show}>
      <Loading />
    </Modal>
  );
};
export default Splash;
