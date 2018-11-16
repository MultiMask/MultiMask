import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { css } from 'emotion';

import Typography from 'ui/Typography';
import Menu from 'ui/Menu';
import MenuItem from 'ui/MenuItem';
import BaseButton from 'ui/Button';
import TextField from 'ui/TextField';

import profileActions from 'popup/actions/profile';
import accountActions from 'popup/actions/account';
import { readFile } from 'helpers/files';

const Wrapper = styled('div')`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const List = styled('div')`
  flex-grow: 1;
  padding: 0 20px;
  overflow-y: auto;
`;

const Bottom = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 20px 0;
`;

const Button = styled(BaseButton)`
  min-width: 80px;
`;

const Item = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.secondary};
  position: relative;
  padding: 10px 0;
`;

interface ItemDescriptionProps {
  isEdit?: boolean;
}
const ItemDescription = styled(Typography)`
  position: absolute;
  bottom: ${(props: ItemDescriptionProps) => (props.isEdit ? 0 : '10px')};
  left: 0;
`;

const actions = {
  ...profileActions,
  getInfo: accountActions.getInfo
};
type IPropsActions = Actions<typeof actions>;
interface IProps extends IPropsActions {
  list: ProfileInfo[];
  current: string;
}
interface IState {
  editProfileId: string;
  profileName: string;
}

class Profiles extends React.Component<IProps, IState> {
  private pass;
  private textInput;

  public state = {
    editProfileId: null,
    profileName: ''
  };

  public componentDidMount () {
    this.props.getList();
  }

  public onAdd = () => {
    this.props.add();
  };

  public onRemove = id => {
    this.props.remove(id);
  };

  public onExport = id => {
    this.props.export(id);
  };

  public handleEdit = ({ name, id }) => () => {
    this.setState({ editProfileId: id, profileName: name });
  };

  public handleProfileNameChange = event => {
    this.setState({ profileName: event.target.value });
  };

  public handleOnBlurInput = (profile, name) => () => {
    const { id, name: oldName } = profile;

    if (oldName !== name) {
      const { update } = this.props;
      update(id, { name });
    }

    this.setState({ editProfileId: null });
  };

  public handleImportProfile = () => {
    const onImport = encryptedProfile => this.props.setImportingProfile(encryptedProfile);

    readFile(onImport);
  };

  public handleSelect = profileId => event => {
    event.preventDefault();

    this.props.select(profileId).then(() => {
      this.props.getInfo();
    });
  };

  get list () {
    const { list, current } = this.props;
    const { editProfileId, profileName } = this.state;

    return list.map(profile => {
      const onRemove = this.onRemove.bind(this, profile.id);

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
              color={profile.id === current ? 'primary' : 'main'}
              variant="subheading"
            >
              {profile.name}
            </Typography>
          )}
          <ItemDescription isEdit={isEdit} color="hint">
            {profile.wallets} wallets
          </ItemDescription>
          <Menu iconProps={{ color: 'secondary', name: 'ellipsis-h' }}>
            <MenuItem onClick={this.handleEdit(profile)}>Edit</MenuItem>
            <MenuItem component={Link} to={`/profiles/${profile.id}/export`}>
              Export
            </MenuItem>
            <MenuItem component={Link} to={`/profiles/${profile.id}/seed`}>
              Export Seed
            </MenuItem>
            <MenuItem component={Link} to={`/profiles/${profile.id}/qrcode`}>
              Show QR-code
            </MenuItem>
            <MenuItem onClick={onRemove}>Delete</MenuItem>
          </Menu>
        </Item>
      );
    });
  }

  public render () {
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
  ({ profile, state }: IPopup.AppState) => ({
    list: profile.list,
    current: profile.current
  }),
  actions
)(Profiles as any);
