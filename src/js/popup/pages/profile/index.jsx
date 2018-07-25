import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Typography from '../../ui/Typography';
import Menu from '../../ui/Menu';
import MenuItem from '../../ui/MenuItem';
import BaseButton from '../../ui/Button';
import TextField from '../../ui/TextField';
import { STATE_VIEW_EXPORT_PROFILE } from './../../../constants/state';
import NeedAuth from '../../ui/components/NeedAuth';
import profileActions from './../../actions/profile';
import stateActions from '../../actions/state';

class Profiles extends React.Component {
  state = {
    editProfileId: false,
    profileName: '',
    handleExportProfile: null
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

  handleNeedAuth = exportFunc => {
    const { goBack } = this.props;
    const { handleExportProfile } = this.state;
    goBack();
    handleExportProfile();
  };

  handleConfirmPassword = handleExportProfile => () => {
    const { goExport } = this.props;

    this.setState({ handleExportProfile });
    goExport();
  };

  get list() {
    const { list } = this.props;
    const { editProfileId, profileName } = this.state;

    return list.map(profile => {
      const onRemove = this.onRemove.bind(this, profile.id);
      const handleExportProfile = this.onExport.bind(this, profile.id);
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
            <Typography color="main" variant="subheading">
              {profile.name}
            </Typography>
          )}
          <ItemDescription isEdit={isEdit} color="hint">
            {profile.accounts.length} wallets
          </ItemDescription>
          <Menu iconProps={{ color: 'secondary', name: 'ellipsis-h' }}>
            <MenuItem onClick={this.handleEdit(profile)}>Edit</MenuItem>
            <MenuItem onClick={this.handleConfirmPassword(handleExportProfile)}>Export</MenuItem>
            <MenuItem onClick={onRemove}>Delete</MenuItem>
          </Menu>
        </Item>
      );
    });
  }

  render() {
    const { view } = this.props;

    if (view === STATE_VIEW_EXPORT_PROFILE) {
      return <NeedAuth onSubmit={this.handleNeedAuth} />;
    }

    return (
      <Wrapper>
        <List>{this.list}</List>
        <Bottom>
          <Button outlined onClick={this.onAdd}>
            Add
          </Button>
          <Button>Import</Button>
        </Bottom>
      </Wrapper>
    );
  }
}

export default connect(
  ({ profile, state }) => ({
    list: profile.list,
    view: state.view
  }),
  dispatch =>
    bindActionCreators(
      {
        ...profileActions,
        goExport: stateActions.goExportProfile,
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

const ItemDescription = styled(Typography)`
  position: absolute;
  bottom: ${props => (props.isEdit ? 0 : '10px')};
  left: 0;
`;
