import * as React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';

import { BCSign } from 'bcnetwork';
import { IWalletInfo } from 'types/accounts';

import { Typography } from 'ui';

const Resource = styled('div')`
  margin: 10px 0;
`;
const ProgressOut = styled('div')`
  margin: 3px;
  width: 60%;
`;
const ProgressIn = styled('div')`
  background: #dfe7ee;
  height: 12px;
  border-radius: 3px;
  overflow: hidden;
`;
interface IProgress {
  progess: number;
}
const ProgressSize = styled('div')`
  width: ${(props: IProgress) => props.progess}%;
  height: 100%;
  background: #50d166;
`;

interface IProps {
  account: IWalletInfo;
}

const bytoToKb = bytes => (bytes / 1024).toFixed(2).toString() + ' Kb';

export class Resources extends React.Component<IProps, {}> {
  public render () {
    const { account } = this.props;
    const { raw } = account.info;

    console.log(raw);

    return (
      <React.Fragment>
        <Resource>
          <Typography variant="subheading">Ram</Typography>
          <Typography variant="body1">
            Use: {bytoToKb(raw.ram_quota - raw.ram_usage)} / {bytoToKb(raw.ram_quota)}
          </Typography>
          <ProgressOut>
            <ProgressIn>
              <ProgressSize progess={((raw.ram_quota - raw.ram_usage) / raw.ram_quota) * 100} />
            </ProgressIn>
          </ProgressOut>
        </Resource>
      </React.Fragment>
    );
  }
}
