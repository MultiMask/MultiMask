import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'react-emotion';

import profileActions from './../../actions/profile';

class Profiles extends React.Component {
  componentDidMount() {
    this.props.getList();
  }

  get list() {
    const { list } = this.props;

    return list.map(profile => {
      return <Item key={profile.id}>{profile.name}</Item>;
    });
  }

  render() {
    return <Wrapper>{this.list}</Wrapper>;
  }
}

export default connect(
  ({ profile }) => ({
    list: profile.list
  }),
  dispatch => bindActionCreators(profileActions, dispatch)
)(Profiles);

const Wrapper = styled.div`
  padding: 20px 10px;
`;
const Item = styled.div`
  padding: 5px;
`;
