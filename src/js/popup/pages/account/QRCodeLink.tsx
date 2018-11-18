import * as React from 'react';
import QRCode = require('qrcode.react');
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { getCurrentWallet } from './../../select';
import Typography from 'popup/ui/Typography';
import { IWalletInfo } from 'types/accounts';
import { getExplorerLink, LinkTypes } from 'helpers/links';

interface IQRCodeLink {
  account: IWalletInfo;
}

const QRCodeLink: React.SFC<IQRCodeLink> = ({ account }) => {
  const url = getExplorerLink(account, account.info.address, LinkTypes.Address);
  return (
    <Container>
      <Typography align="center" color="main" variant="title">
        Link qr - code to your wallet
      </Typography>
      <QRCode value={url} renderAs="svg" size={310} />
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
