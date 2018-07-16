import React from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';

const Wrapper = styled.div``;

class Profiles extends React.Component {
  render() {
    return <Wrapper>Profile list</Wrapper>;
  }
}

export default connect()(Profiles);
