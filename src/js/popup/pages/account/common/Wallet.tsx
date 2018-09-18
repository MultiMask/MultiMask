import * as React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import priceActions from '../../../actions/prices';

import Icon from '../../../ui/components/Icon';
import Typography from '../../../ui/Typography';

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

const Inner = styled('div')`
  display: flex;
`;
const Left = styled('div')`
  display: flex;
  flex-direction: column;
`;
const Center = styled('div')`
  margin: 0 10px;
`;
const Right = styled('div')``;

class Wallet extends React.Component<any, any> {
  public render () {
    const {
      data: {
        info: { address, balance, network },
        blockchain,
        id
      },
      menu,
      actions,
      getPrice
    } = this.props;

    return (
      <WalletContainer className="item">
      <Inner>
        <Left>
          <Icon type={blockchain}/>
          <Link
            className={css`
              text-decoration: none;
              margin-top: 8px;
            `}
            to={`/account/edit/${id}`}
          >
            <Sing>{network}</Sing>
          </Link>
        </Left>
        <Center>
          <Typography
            className={css`
              white-space: inherit;
              word-break: break-all;
              font-size: 0.8rem;
            `}
            color="secondary"
          >
            {address}
          </Typography>
            <Typography
              className={css`
                display: block;
                margin-top: 10px;
                margin-bottom: 5px;
                font-size: 1rem;
                font-weight: bold;
              `}
              color="main"
            >
              {`${balance} ${blockchain}`}
            </Typography>
            <Typography 
              className={css`
                font-size: 0.9rem;
              `}
              color="secondary"
            >
              {getPrice(balance, blockchain)} USD
            </Typography>
        </Center>
        <Right>
          {menu}
        </Right>
        </Inner>
        {actions}
      </WalletContainer>
    )
  }
}

export default connect(
  null,
  dispatch => bindActionCreators(priceActions, dispatch)
)(Wallet);
