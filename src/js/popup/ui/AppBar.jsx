import React from 'react';
import styled from 'react-emotion';

const Container = styled.div`
  display: flex;
`;

const AppBar = ({ children }) => <Container>{children}</Container>;

export default AppBar;

{
  /* <div className="header">
  {this.showBack && (
    <div className="header_back">
      <FontAwesome name="chevron-left" onClick={this.handleBack} />
    </div>
  )}
  {!this.props.creation && (
    <div className="header_add">
      <FontAwesome name="plus-circle" onClick={this.props.createWallet} />
      <FontAwesome name="sign-out-alt" onClick={this.props.logout} />
    </div>
  )}
</div>; */
}
