import * as React from 'react';
import QRCode = require('qrcode.react');
import styled, { css } from 'react-emotion';
import { connect } from 'react-redux';

import { getCurrentWallet } from 'popup/select';
import { IWalletInfo } from 'types/accounts';

import { Notify, Typography } from 'ui';

interface IQRCodeLink {
  account: IWalletInfo;
}

const QRCodeLink: React.SFC<IQRCodeLink> = ({ account }) => {
  return (
    <Container>
      <Typography align="center" color="main" variant="title">
        Your's wallet address:
      </Typography>
      <Typography
        align="center"
        color="primary"
        variant="div"
        className={css`
          margin-bottom: 10px;
          font-size: 105%;
        `}
      >
        <Notify>{account.info.address}</Notify>
      </Typography>

      <QRCode value={account.info.address} renderAs="svg" size={310} />
    </Container>
  );
};

export default connect(
  (state: IPopup.AppState) => ({
    account: getCurrentWallet(state)
  }),
  null
)(QRCodeLink);

const Container = styled('div')`
  padding: 20px;
`;
