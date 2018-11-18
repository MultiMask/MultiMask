import * as React from 'react';
import { format } from 'date-fns';
import CopyToClipboard = require('react-copy-to-clipboard');

import Typography from 'ui/Typography';
import Icon from 'ui/Icon';
import { calcTxBalance } from 'helpers/btc';

import { DATE_FORMAT, Header, Root, styles } from './elements';

const findAmount = ({ tx, addr }) => {
  return calcTxBalance(tx);
};

const BTCList = ({ txs, address }) =>
  txs.map(tx => (
    <Root key={tx.txid}>
      <Header>
        <Typography color="main">{format(tx.time * 1000, DATE_FORMAT)}</Typography>
        <CopyToClipboard text={tx.txid}>
          <Icon className={styles.icon} name="clone" color="secondary" />
        </CopyToClipboard>
      </Header>
      <div>
        <Typography className={styles.rowItem} color="hint">
          Amount:
        </Typography>
        <Typography className={styles.rowItem} color="primary">
          {findAmount({ tx, addr: address })}
        </Typography>
        <Typography className={styles.rowItem} color="primary">
          BTC
        </Typography>
      </div>
    </Root>
  ));

export default BTCList;
