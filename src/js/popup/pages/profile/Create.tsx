import React, { Component } from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';
import { connect } from 'react-redux';
import FA from 'react-fontawesome';

import ProfileCreateActions from 'popup/actions/ui/createProfile';

import Button from 'ui/Button';
import SeedView from 'ui/SeedView';
import Typograhy from 'ui/Typography';
import Modal from 'ui/Modal';
import Loading from 'popup/pages/Loading';

const Wrapper = styled('div')`
  position: relative;
  height: 100%;
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
interface IState {
  show: boolean;
}

class CreateProfile extends Component<IProps, IState> {
  public state = {
    show: false
  };

  public componentDidMount () {
    if (!this.props.seed) {
      this.handleGenerete();
    }
  }

  public handleGenerete = () => {
    this.props.generate();
  };

  public handleDone = () => {
    this.setState({ show: true }, () => {
      this.props.done();
    });
  };

  public render () {
    return (
      <Wrapper>
        <Modal show={this.state.show}>
          <Loading />
        </Modal>
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
          <Button onClick={this.handleDone}>I saved my Mnemonic Phrase</Button>
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
