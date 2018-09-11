import * as React from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
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

const Header = styled('div')`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  margin: 0 20px;
  border-bottom: 1px solid ${props => props.theme.colors.secondary};
`;

type HeaderItemProps = {
  theme?: any;
  color?: any;
}

const HeaderItem = styled('div')`
  color: ${(props: HeaderItemProps) => props.theme.colors[props.color] || props.theme.colors.primary};
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

class MainLayout extends React.Component<any, any> {
  componentDidMount() {
    this.props.check();
  }

  render() {
    const {
      logout,
      children,
      goBack,
      needAuth,
      location: { pathname }
    } = this.props;

    return (
      <Container>
        <Header>
          <HeaderItem color="secondary">
            {pathname !== '/wallets/create' && (
              <Link to="wallets/create">
                <Icon className={styles.icon} name="plus-circle" />
              </Link>
            )}
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

          {pathname !== '/' && (
            <HeaderItem onClick={goBack}>
              <FontAwesome name="chevron-left" />
              <Typography className={styles.buttonText} color="primary">
                Back
              </Typography>
            </HeaderItem>
          )}
        </Header>
        {needAuth ? <NeedAuth>{children}</NeedAuth> : children}
      </Container>
    );
  }
}

export default withRouter(
  connect(
    null,
    dispatch => bindActionCreators({ ...authAction, ...routingActions }, dispatch)
  )(MainLayout)
);