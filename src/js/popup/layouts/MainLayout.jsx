import React from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';
import { STATE_VIEW_MAIN } from '../../constants/state';
import stateActions from '../actions/state';
import authAction from '../actions/auth';
import { BaseContainer } from './BaseContainer';
import Typography from '../ui/Typography';
import Menu from '../ui/Menu';
import MenuItem from '../ui/MenuItem';
import Icon from '../ui/Icon';

const Container = styled(BaseContainer)`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  margin: 0 20px;
  border-bottom: 1px solid ${props => props.theme.colors.secondary};
`;

const HeaderItem = styled.div`
  color: ${props => props.theme.colors[props.color] || props.theme.colors.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const styles = {
  icon: css`
    font-size: 16px;
    margin-left: 8px;
  `,
  buttonText: css`
    margin-left: 5px;
  `
};

class MainLayout extends React.Component {
  handleBack = () => {
    this.props.goBack();
  };

  get showBack() {
    return this.props.view !== STATE_VIEW_MAIN;
  }

  render() {
    const { createWallet, logout, children, creation, goProfile, goToSettings } = this.props;

    return (
      <Container>
        <Header>
          {!creation && (
            <HeaderItem color="secondary">
              <Icon className={styles.icon} name="plus-circle" onClick={createWallet} />
              <Menu iconProps={{ className: styles.icon, color: 'secondary', name: 'cog' }}>
                <MenuItem onClick={goProfile}>Profiles</MenuItem>
                <MenuItem onClick={goToSettings}>Settings</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </HeaderItem>
          )}
          {this.showBack && (
            <HeaderItem onClick={this.handleBack}>
              <FontAwesome name="chevron-left" />
              <Typography className={styles.buttonText} color="primary">
                Back
              </Typography>
            </HeaderItem>
          )}
        </Header>
        {children}
      </Container>
    );
  }
}

export default connect(
  ({ state }) => ({
    view: state.view
  }),
  dispatch => bindActionCreators({ ...stateActions, ...authAction }, dispatch)
)(MainLayout);
