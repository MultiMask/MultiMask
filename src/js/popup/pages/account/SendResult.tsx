import * as React from 'react';
import styled, { css } from 'react-emotion';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import CopyToClipboard = require('react-copy-to-clipboard');
import Typography from 'popup/ui/Typography';
import { IWalletInfo } from 'types/accounts';
import { openUrlToTab, LinkTypes } from 'helpers/links';
import { getCurrentWallet } from 'popup/select';
import Icon from 'popup/ui/Icon';
import SeedView from 'ui/SeedView';

interface ISendResult {
  account: IWalletInfo;
  match: {
    params: {
      txhash: string;
    };
  };
}

const SendResult: React.SFC<ISendResult> = ({
  account,
  match: {
    params: { txhash }
  }
}) => {
  return (
    <Container>
      <Wrapper>
        <Typography align="center" color="main" variant="headline">
          {txhash === 'undefined' ? 'Error' : 'Success'}
        </Typography>
        <Icon name="check-circle" color="success" className={styles.successIcon} />
      </Wrapper>
      {txhash !== 'undefined' && (
        <React.Fragment>
          <Wrapper>
            <Typography align="center" color="main" variant="title">
              TxHash:
            </Typography>
            <CopyToClipboard text={txhash}>
              <Icon className={styles.icon} name="clone" color="secondary" />
            </CopyToClipboard>
            <Icon
              className={`${styles.icon} ${styles.left}`}
              onClick={() => openUrlToTab(account, txhash, LinkTypes.TX)}
              name="link"
              color="secondary"
            />
          </Wrapper>
          <SeedView style={{ height: 'auto' }}>{txhash}</SeedView>
        </React.Fragment>
      )}
    </Container>
  );
};

export default withRouter(connect(
  (state: IPopup.AppState) => ({
    account: getCurrentWallet(state)
  }),
  null
)(SendResult) as any);

const Container = styled('div')`
  padding: 20px;
`;
const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const styles = {
  icon: css`
    cursor: pointer;
    margin-left: 8px;
  `,
  successIcon: css`
    font-size: 250%;
    margin-left: 12px;
  `,
  left: css`
    margin-left: 8px;
  `
};
