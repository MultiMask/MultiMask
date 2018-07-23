import { css } from 'emotion';
import React from 'react';
import styled from 'react-emotion';
import getPrice from '../../../../helpers/getPrice';
import networkSign from '../../../../helpers/networkSign';
import Icon from '../../../ui/components/Icon';
import Typography from '../../../ui/Typography';

const WalletContainer = styled.div`
  padding: 10px 20px;
  margin-left: 5px;
  background-color: #fff;
`;

const WalletHeader = styled.div`
  display: flex;
  align-items: center;
`;

const WalletContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 10px;
`;

const Wallet = ({
  data: {
    info: { address, balance },
    blockchain
  },
  menu,
  actions,
  settings
}) => (
  <WalletContainer className="item">
    <WalletHeader>
      <Icon type={blockchain} size="s" />
      <Typography
        className={css`
          padding: 0 12px;
        `}
        color="secondary"
      >
        {address}
      </Typography>
      {menu}
    </WalletHeader>
    <WalletContent>
      <div>
        <Typography
          className={css`
            display: block;
            margin-bottom: 5px;
          `}
          color="main"
        >
          {`${balance} ${networkSign({ blockchain })}`}
        </Typography>
        <Typography color="secondary">{getPrice(settings && settings.prices, blockchain, balance)} USD</Typography>
      </div>
      {actions}
    </WalletContent>
  </WalletContainer>
);

export default Wallet;
