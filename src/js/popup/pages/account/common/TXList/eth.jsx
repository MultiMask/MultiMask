import React from 'react';
import { format } from 'date-fns';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Typography from '../../../../ui/Typography';
import Icon from '../../../../ui/Icon';

import web3 from 'web3';

import { DATE_FORMAT, Header, Root, styles } from './elements';

const ETHList = ({ txs, address }) =>
  txs.map(tx => (
    <Root key={tx.hash}>
      <Header>
        <Typography color="main">{format(tx.timeStamp * 1000, DATE_FORMAT)}</Typography>
        <CopyToClipboard text={tx.hash}>
          <Icon className={styles.icon} name="clone" color="secondary" />
        </CopyToClipboard>
      </Header>
      <div>
        <Typography className={styles.rowItem} color="hint">
          Amount:
        </Typography>
        <Typography className={styles.rowItem} color="primary">
          {web3.utils.fromWei(tx.value, 'ether')}
        </Typography>
        <Typography className={styles.rowItem} color="primary">
          ETH
        </Typography>
      </div>
    </Root>
  ));

export default ETHList;
