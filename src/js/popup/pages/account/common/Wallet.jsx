import React from 'react';
import networkSign from '../../../../helpers/networkSign';
import Icon from '../../../ui/components/Icon';
import Typography from '../../../ui/Typography';
import styled from 'react-emotion';
import { css } from 'emotion';

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
  actions
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
        <Typography color="secondary">? USDT</Typography>
      </div>
      {actions}
    </WalletContent>
  </WalletContainer>
);

export default Wallet;
