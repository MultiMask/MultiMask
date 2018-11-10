import React, { Component } from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';
import { connect } from 'react-redux';
import FA from 'react-fontawesome';

import ProfileCreateActions from 'popup/actions/ui/createProfile';

import Button from 'ui/Button';
import SeedView from 'ui/SeedView';
import Typograhy from 'ui/Typography';

const Wrapper = styled('div')`
  padding: 20px;
  text-align: center;
`;

const BtnRow = styled('div')`
  text-align: center;
`;

const styles = {
  view: css`
    height: 65px;
  `,
  generate: css`
    margin-top: 10px;
  `,
  confirm: css`
    margin-top: 70px;
  `
};

interface IProps extends Actions<typeof ProfileCreateActions> {
  seed?: string;
}

class CreateProfile extends Component<IProps, {}> {
  public componentDidMount () {
    if (!this.props.seed) {
      this.handleGenerete();
    }
  }

  public handleGenerete = () => {
    this.props.generate();
  };

  public hundleDone = () => {
    this.props.done();
  };

  public render () {
    return (
      <Wrapper>
        <Typograhy color="main" variant="headline" align="center">
          Create Profile
        </Typograhy>
        <hr />
        <Typograhy color="main" variant="subheading" align="center">
          Save your Mnemonic Phrase
        </Typograhy>
        <SeedView className={styles.view}>{this.props.seed}</SeedView>
        <BtnRow className={styles.generate}>
          <Button outlined onClick={this.handleGenerete}>
            <FA name="sync" /> &nbsp; generate new
          </Button>
        </BtnRow>
        <BtnRow className={styles.confirm}>
          <Button onClick={this.props.done}>I saved my Mnemonic Phrase</Button>
        </BtnRow>
      </Wrapper>
    );
  }
}

export default connect(
  ({ ui }: IPopup.AppState) => ({
    seed: ui.profileCreate.seed
  }),
  ProfileCreateActions
)(CreateProfile);
