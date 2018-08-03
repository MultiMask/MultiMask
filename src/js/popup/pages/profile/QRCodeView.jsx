import React from 'react';
import QRCode from 'qrcode.react';
import styled from 'react-emotion';
import Typography from '../../ui/Typography';

const QRCodeView = ({ data, size, profileId }) => (
  <Container>
    <Typography align="center" color="main" variant="title">
      QR - code {profileId}
    </Typography>
    {/* <QRCode value={data} renderAs="svg" /> */}
  </Container>
);

QRCodeView.defaultProps = {
  size: 300
};

export default QRCodeView;

const Container = styled.div`
  padding: 20px;
`;
