import * as React from 'react';
import { format } from 'date-fns';
import CopyToClipboard = require('react-copy-to-clipboard');

import Typography from 'ui/Typography';
import Icon from 'ui/Icon';
import Notify from 'ui/Notify';

import Web3 = require('web3');
const web3 = new Web3();

import { DATE_FORMAT, Header, Root, styles } from './elements';

const ETHList = ({ txs, address, linkToExplorer }) =>
  txs.map(tx => (
    <Root key={tx.hash}>
      <Header>
        <Typography color="main">{format(tx.timeStamp * 1000, DATE_FORMAT)}</Typography>
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
