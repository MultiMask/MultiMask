import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { css } from 'emotion';
import Typography from '../../ui/Typography';
import Menu from '../../ui/Menu';
import MenuItem from '../../ui/MenuItem';
import BaseButton from '../../ui/Button';
import TextField from '../../ui/TextField';
import {
  STATE_VIEW_EXPORT_PROFILE,
  STATE_VIEW_IMPORT_PROFILE,
  STATE_VIEW_QRCODE_PROFILE
} from './../../../constants/state';
import NeedAuth from '../../ui/components/NeedAuth';
import AuthForm from '../../ui/components/NeedAuth/AuthForm';
import profileActions from './../../actions/profile';
import stateActions from '../../actions/state';
import { readFile, formToJson } from '../../helpers/index';
import QRCodeView from './QRCodeView';

class Profiles extends React.Component<any, any> {
  private pass;
  private textInput;

  state = {
    editProfileId: false,
    qrcodeProfileId: null,
    profileName: '',
    handleExportProfile: null,
    encryptedProfile: null
  };

  componentDidMount() {
    this.props.getList();
  }

  onAdd = () => {
    this.props.add();
  };

  onRemove = id => {
    this.props.remove(id);
  };

  onExport = id => {
    this.props.export(id);
  };

  showQRCode = profileId => {
    const { goQRCode } = this.props;
    this.setState({ qrcodeProfileId: profileId });
    goQRCode();
  };

  handleEdit = ({ name, id }) => () => {
    this.setState({ editProfileId: id, profileName: name });
  };

  handleProfileNameChange = event => {
    this.setState({ profileName: event.target.value });
  };

  handleOnBlurInput = (profile, name) => () => {
    const { id, name: oldName } = profile;

    if (oldName !== name) {
      const { update } = this.props;
      update(id, { name });
    }

    this.setState({ editProfileId: null });
  };

  handleNeedAuthExport = exportFunc => {
    const { goBack } = this.props;
    const { handleExportProfile } = this.state;
    handleExportProfile();
    goBack();
  };

  handleConfirmPassword = handleExportProfile => () => {
    const { goExport } = this.props;

    this.setState({ handleExportProfile });
    goExport();
  };

  handleNeedAuthImport = e => {
    e.preventDefault();
    const { encryptedProfile } = this.state;

    const json: any = formToJson(e.target);
    this.pass = json.password;

    this.props.import(this.pass, encryptedProfile);
    this.props.goBack();

    this.setState({ encryptedProfile: null });
  };

  handleImportProfile = () => {
    const { goImport } = this.props;

    const onImport = encryptedProfile => {
      this.setState({ encryptedProfile });
      goImport();
    };

    readFile(onImport);
  };

  handleSelect = profileId => event => {
    event.preventDefault();
    const { select } = this.props;

    select(profileId);
  };

  get list() {
    const { list, selectedProfileId } = this.props;
    const { editProfileId, profileName } = this.state;

    return list.map(profile => {
      const onRemove = this.onRemove.bind(this, profile.id);
      const handleExportProfile = this.onExport.bind(this, profile.id);
      const handleShowQRCode = this.showQRCode.bind(this, profile.id);

      const isEdit = editProfileId === profile.id;
      return (
        <Item key={profile.id}>
          {isEdit ? (
            <TextField
              inputRef={this.textInput}
              autoFocus
              onChange={this.handleProfileNameChange}
              value={profileName}
              onBlur={this.handleOnBlurInput(profile, profileName)}
            />
          ) : (
              <Typography
                className={css`
                  cursor: pointer;
                `}
                onClick={this.handleSelect(profile.id)}
                color={profile.id === selectedProfileId ? 'primary' : 'main'}
                variant="subheading"
              >
                {profile.name}
              </Typography>
            )}
          <ItemDescription isEdit={isEdit} color="hint">
            {profile.accounts.length} wallets
          </ItemDescription>
          <Menu iconProps={{ color: 'secondary', name: 'ellipsis-h' }}>
            <MenuItem onClick={this.handleEdit(profile)}>Edit</MenuItem>
            <MenuItem onClick={this.handleConfirmPassword(handleExportProfile)}>Export</MenuItem>
            <MenuItem onClick={handleShowQRCode}>Show QR-code</MenuItem>
            <MenuItem onClick={onRemove}>Delete</MenuItem>
          </Menu>
        </Item>
      );
    });
  }

  render() {
    const { view } = this.props;
    const { qrcodeProfileId } = this.state;

    if (view === STATE_VIEW_EXPORT_PROFILE) {
      return <NeedAuth onSubmit={this.handleNeedAuthExport} />;
    }

    if (view === STATE_VIEW_IMPORT_PROFILE) {
      return <AuthForm handleSubmit={this.handleNeedAuthImport} />;
    }

    if (view === STATE_VIEW_QRCODE_PROFILE) {
      return (
        <NeedAuth>
          <QRCodeView profileId={qrcodeProfileId} />
        </NeedAuth>
      );
    }

    return (
      <Wrapper>
        <List>{this.list}</List>
        <Bottom>
          <Button outlined onClick={this.onAdd}>
            Add
          </Button>
          <Button onClick={this.handleImportProfile}>Import</Button>
        </Bottom>
      </Wrapper>
    );
  }
}

export default connect(
  ({ profile, state }: any) => ({
    list: profile.list,
    selectedProfileId: profile.selectedId,
    view: state.view
  }),
  dispatch =>
    bindActionCreators(
      {
        ...profileActions,
        goExport: stateActions.goExportProfile,
        goImport: stateActions.goImportProfile,
        goQRCode: stateActions.goQRCodeProfile,
        goBack: stateActions.goBack
      },
      dispatch
    )
)(Profiles);

const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const List = styled.div`
  flex-grow: 1;
  padding: 0 20px;
  overflow-y: auto;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 20px 0;
`;

const Button = styled(BaseButton)`
  min-width: 80px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.secondary};
  position: relative;
  padding: 10px 0;
`;

type ItemDescriptionProps = {
  isEdit?: boolean;
}
const ItemDescription = styled(Typography)`
  position: absolute;
  bottom: ${(props: ItemDescriptionProps) => (props.isEdit ? 0 : '10px')};
  left: 0;
`;
