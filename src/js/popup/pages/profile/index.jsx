import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Typography from '../../ui/Typography';
import Menu from '../../ui/Menu';
import MenuItem from '../../ui/MenuItem';
import BaseButton from '../../ui/Button';

import profileActions from './../../actions/profile';

class Profiles extends React.Component {
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

  get list() {
    const { list } = this.props;

    return list.map(profile => {
      const onRemove = this.onRemove.bind(this, profile.id);
      const onExport = this.onExport.bind(this, profile.id);

      return (
        <Item key={profile.id}>
          <Typography color="main" variant="subheading">
            {profile.name}
          </Typography>
          <ItemDescription color="hint">{profile.accounts.length} wallets</ItemDescription>
          <Menu iconProps={{ color: 'secondary', name: 'ellipsis-h' }}>
            <MenuItem>Edit</MenuItem>
            <MenuItem onClick={onExport}>Export</MenuItem>
            <MenuItem onClick={onRemove}>Delete</MenuItem>
          </Menu>
        </Item>
      );
    });
  }

  render() {
    console.log(this.props);
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
  ({ profile }) => ({
    list: profile.list
  }),
  dispatch => bindActionCreators(profileActions, dispatch)
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
  bottom: 10px;
  left: 0;
`;
