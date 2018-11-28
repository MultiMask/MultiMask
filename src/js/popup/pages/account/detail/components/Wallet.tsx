import * as React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import priceActions from 'popup/actions/prices';
import { URL_ACCOUNT_EDIT } from 'constants/popupUrl';

import { BcIcon, Typography } from 'ui';

const WalletContainer = styled('div')`
  padding: 10px 20px;
  margin-left: 5px;
  background-color: #fff;
`;

const WalletHeader = styled('div')`
  display: flex;
  align-items: center;
`;

const WalletContent = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 10px;
`;

const Sing = styled('div')`
  padding: 0.5em;
  color: #bdc2ce;
  border-radius: 3px;
  background-color: #ebeef5;
  cursor: pointer;
`;

class Wallet extends React.Component<any, any> {
  public render () {
    const {
      data: {
        info: { address, balance, network },
        blockchain,
        key
      },
      menu,
      actions,
      getPrice
    } = this.props;

    return (
      <WalletContainer className="item">
        <WalletHeader>
          <BcIcon type={blockchain} size="s" />
          <Typography
            className={css`
              padding: 0 12px;
            `}
            color="secondary"
          >
            {address}
          </Typography>
          <Link
            className={css`
              text-decoration: none;
            `}
            to={`${URL_ACCOUNT_EDIT}/${key}`}
          >
            <Sing>{network}</Sing>
          </Link>
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
              {`${balance} ${blockchain}`}
            </Typography>
            <Typography color="secondary">{getPrice(balance, blockchain)} USD</Typography>
          </div>
          {actions}
        </WalletContent>
      </WalletContainer>
    );
  }
}

export default connect(
  null,
  dispatch => bindActionCreators(priceActions, dispatch)
)(Wallet);
