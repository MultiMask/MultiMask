import React, { Component } from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';
import { connect } from 'react-redux';
import FA from 'react-fontawesome';
import { isNull } from 'lodash';

import * as bip39 from 'bip39';

import ProfileCreateActions from 'popup/actions/ui/createProfile';

import Button from 'ui/Button';
import SeedView from 'ui/SeedView';
import Typograhy from 'ui/Typography';
import Modal from 'ui/Modal';
import Loading from 'popup/pages/Loading';
import { IPropsThemed } from 'config/theme';

const Wrapper = styled('div')`
  position: relative;
  height: 100%;
  padding: 20px;
  text-align: center;
`;
const BtnRow = styled('div')`
  text-align: center;
`;
interface IResultText extends IPropsThemed {
  error: boolean;
}
const ResultText = styled('div')`
  color: ${(props: IResultText) => (props.error ? props.theme.colors.error : props.theme.colors.multi)};
  font-weight: bold;
  font-size: 13px;
  text-align: center;
`;
const InputArea = SeedView.withComponent('textarea');
const styles = {
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
  input: boolean;
  seed: string;
  verified: boolean;
}

class CreateProfile extends Component<IProps, IState> {
  public state = {
    show: false,
    input: false,
    verified: null,
    seed: ''
  };

  public componentDidMount () {
    if (!this.props.seed) {
      this.handleGenerete();
    }
  }

  public handleGenerete = () => {
    this.props.generate();
  };

  public handleTypeNew = () => {
    this.setState({
      seed: '',
      verified: null
    });
  };

  public handleDone = () => {
    this.setState({ show: true }, () => {
      this.props.done();
    });
  };

  public handleUserConfirm = () => {
    this.props.done(this.state.seed);
  };

  public handleVerify = () => {
    const verified = bip39.validateMnemonic(this.state.seed);
    this.setState({ verified });
  };

  public handleSwitchType = () => {
    this.setState({
      input: !this.state.input,
      seed: '',
      verified: null
    });
  };

  public handleInputMnemonic = e => {
    this.setState({ seed: e.target.value });
  };

  public render () {
    const isIn = this.state.input;
    const valid = this.state.verified;
    const hasValidated = !isNull(valid);

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
        {!isIn && <SeedView>{this.props.seed}</SeedView>}
        {isIn && <InputArea onChange={this.handleInputMnemonic} readOnly={valid} />}
        {isIn &&
          hasValidated && (
            <React.Fragment>
              {valid && <ResultText error={false}>Success</ResultText>}
              {!valid && <ResultText error={true}>Wrong mnemonic phase</ResultText>}
            </React.Fragment>
          )}
        <BtnRow className={styles.generate}>
          {!isIn && (
            <React.Fragment>
              <Button outlined onClick={this.handleGenerete}>
                <FA name="sync" /> &nbsp; generate new
              </Button>
              &nbsp;&nbsp;
            </React.Fragment>
          )}
          {isIn &&
            valid && (
              <React.Fragment>
                <Button outlined onClick={this.handleTypeNew}>
                  <FA name="sync" /> &nbsp; Type new
                </Button>
                &nbsp;&nbsp;
              </React.Fragment>
            )}
          <Button outlined onClick={this.handleSwitchType}>
            {!isIn && 'Type mnemonic'}
            {isIn && 'Generate phase'}
          </Button>
        </BtnRow>
        <BtnRow className={styles.confirm}>
          {!isIn && <Button onClick={this.handleDone}>I saved my Mnemonic Phrase</Button>}
          {isIn && !valid && <Button onClick={this.handleVerify}>Verify</Button>}
          {isIn && valid && <Button onClick={this.handleUserConfirm}>Confirm</Button>}
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
