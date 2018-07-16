import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Typography from '../../ui/Typography';

import FA from 'react-fontawesome';

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
          <Label>{profile.name}</Label>
          <Actions>
            <Icon name="edit" />
            <Icon name="upload" onClick={onExport} />
            <Icon name="trash" onClick={onRemove} />
          </Actions>
        </Item>
      );
    });
  }

  render() {
    return (
      <Wrapper>
        <List>{this.list}</List>
        <Bottom>
          <Button onClick={this.onAdd}>
            <Typography color="main" align="center">
              Add
            </Typography>
          </Button>
          <Button>
            <Typography color="main" align="center">
              Import
            </Typography>
          </Button>
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
  padding: 20px 10px;
`;

const Bottom = styled.div`
  height: 36px;
  display: flex;
  flex-direction: row;
`;

const Button = styled.div`
  flex-grow: 1;
  text-align: center;
  cursor: pointer;
`;

const Item = styled.div`
  padding: 5px;
`;

const Label = styled.span`
  width: 70%;
  display: inline-block;
`;
const Actions = styled.span``;
const Icon = styled(FA)`
  margin-left: 7px;
  font-size: 120%;
  cursor: pointer;
`;
