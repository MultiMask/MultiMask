import * as React from 'react';
import { format } from 'date-fns';
import CopyToClipboard = require('react-copy-to-clipboard');

import { Icon, Notify, Typography } from 'ui';
import { calcTxBalance } from 'helpers/btc';

import { DATE_FORMAT, Header, Root, styles } from './elements';

const getAmount = tx => {
  if (tx.direction === 'in') {
    return (
      <React.Fragment>
        <Typography className={styles.rowItem} color="primary">
          {tx.quantity}
        </Typography>
        <Typography className={styles.rowItem} color="primary">
          {tx.symbol}
        </Typography>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Typography className={styles.rowItem} color="error">
          - {tx.quantity}
        </Typography>
        <Typography className={styles.rowItem} color="error">
          {tx.symbol}
        </Typography>
      </React.Fragment>
    );
  }
};

const EOSList = ({ txs, address, linkToExplorer }) =>
  txs.map(tx => (
    <Root key={tx.hash}>
      <Header>
        <Typography color="main">{format(tx.trx_timestamp, DATE_FORMAT)}</Typography>
        <div>
          <Notify>
            <CopyToClipboard text={tx.hash}>
              <Icon className={styles.icon} name="clone" color="secondary" />
            </CopyToClipboard>
          </Notify>
          <Icon
            className={`${styles.icon} ${styles.left}`}
            onClick={() => linkToExplorer(tx.hash)}
            name="link"
            color="secondary"
          />
        </div>
      </Header>
      <div>
        <Typography className={styles.rowItem} color="hint">
          Amount:
        </Typography>
        {getAmount(tx)}
      </div>
    </Root>
  ));

export default EOSList;
