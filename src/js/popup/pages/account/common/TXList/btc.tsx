import * as React from 'react';
import { format } from 'date-fns';
import CopyToClipboard = require('react-copy-to-clipboard');

import { calcTxBalance } from 'helpers/btc';
import Typography from 'ui/Typography';
import Icon from 'ui/Icon';
import Notify from 'ui/Notify';

import { DATE_FORMAT, Header, Root, styles } from './elements';

const findAmount = ({ tx, addr }) => {
  return calcTxBalance(tx);
};

const BTCList = ({ txs, address, linkToExplorer, bc }) =>
  txs.map(tx => (
    <Root key={tx.txid}>
      <Header>
        <Typography color="main">{format(tx.time * 1000, DATE_FORMAT)}</Typography>
        <div>
          <Notify>
            <CopyToClipboard text={tx.txid}>
              <Icon className={styles.icon} name="clone" color="secondary" />
            </CopyToClipboard>
          </Notify>
          <Icon
            className={`${styles.icon} ${styles.left}`}
            onClick={() => linkToExplorer(tx.txid)}
            name="link"
            color="secondary"
          />
        </div>
      </Header>
      <div>
        <Typography className={styles.rowItem} color="hint">
          Amount:
        </Typography>
        <Typography className={styles.rowItem} color="primary">
          {findAmount({ tx, addr: address })}
        </Typography>
        <Typography className={styles.rowItem} color="primary">
          {bc}
        </Typography>
      </div>
    </Root>
  ));

export default BTCList;
