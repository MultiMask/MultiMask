import React from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';
import authAction from '../actions/auth';
import routingActions from '../actions/routing';
import { BaseContainer } from './BaseContainer';
import Typography from '../ui/Typography';
import Menu from '../ui/Menu';
import MenuItem from '../ui/MenuItem';
import Icon from '../ui/Icon';
import NeedAuth from '../ui/components/NeedAuth';

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
  componentDidMount() {
    this.props.check();
  }

  render() {
    const { createWallet, logout, children, creation, goBack, needAuth } = this.props;
    return (
      <Container>
        <Header>
          {!creation && (
            <HeaderItem color="secondary">
              <Link to="wallets/create">
                <Icon className={styles.icon} name="plus-circle" />
              </Link>
              <Menu iconProps={{ className: styles.icon, color: 'secondary', name: 'cog' }}>
                <MenuItem component={Link} to="/profiles">
                  Profiles
                </MenuItem>
                <MenuItem component={Link} to="/settings">
                  Settings
                </MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </HeaderItem>
          )}
          <HeaderItem onClick={goBack}>
            <FontAwesome name="chevron-left" />
            <Typography className={styles.buttonText} color="primary">
              Back
            </Typography>
          </HeaderItem>
        </Header>
        {needAuth ? <NeedAuth>{children}</NeedAuth> : children}
      </Container>
    );
  }
}

export default connect(
  null,
  dispatch => bindActionCreators({ ...authAction, ...routingActions }, dispatch)
)(MainLayout);
