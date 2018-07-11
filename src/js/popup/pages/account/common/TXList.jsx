import React from 'react';
import { format } from 'date-fns';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { css } from 'emotion';
import styled from 'react-emotion';
import Typography from '../../../ui/Typography';
import Icon from '../../../ui/Icon';

const DATE_FORMAT = 'D MMMM YYYY HH:mm';

const styles = {
  rowItem: css`
    margin-right: 5px;
  `,
  icon: css`
    cursor: pointer;
  `
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 30px 0 20px;
  padding: 15px 0 15px 5px;
  border-bottom: 1px solid ${props => props.theme.colors.hint};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const findAmount = ({ out, addr }) => {
  const output = out.find(oneOut => oneOut.addr === addr);
  if (output) {
    return output.value / 1e8;
  }
};

const BitcoinTXS = ({
  data: {
    info: { txs, address },
    blockchain
  }
}) =>
  txs.map(tx => (
    <Root key={tx.hash}>
      <Header>
        <Typography color="main">{format(tx.time * 1000, DATE_FORMAT)}</Typography>
        <CopyToClipboard text={tx.hash}>
          <Icon className={styles.icon} name="clone" color="secondary" />
        </CopyToClipboard>
      </Header>
      <div>
        <Typography className={styles.rowItem} color="hint">
          Amount:
        </Typography>
        <Typography className={styles.rowItem} color="primary">
          {findAmount({ out: tx.out, addr: address })}
        </Typography>
        <Typography className={styles.rowItem} color="primary">
          {blockchain}
        </Typography>
      </div>
    </Root>
  ));

export default BitcoinTXS;
