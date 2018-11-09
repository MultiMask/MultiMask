import * as React from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import FontAwesome from 'react-fontawesome';

import authAction from 'popup/actions/auth';
import routingActions from 'popup/actions/routing';
import settingsActions from 'popup/actions/settings';

import { BaseContainer } from './BaseContainer';
import Typography from 'ui/Typography';
import Menu from 'ui/Menu';
import MenuItem from 'ui/MenuItem';
import Icon from 'ui/Icon';
import NeedAuth from 'ui/components/NeedAuth';

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
  flex: 0 0 36px;
  box-sizing: border-box;
`;

interface IHeaderItemProps {
  theme?: any;
  color?: any;
}

const HeaderItem = styled('div')`
  color: ${(props: IHeaderItemProps) => props.theme.colors[props.color] || props.theme.colors.primary};
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
  public componentDidMount () {
    this.props.check();
  }

  public render () {
    const {
      logout,
      children,
      goBack,
      needAuth,
      location: { pathname },
      openDomainControl
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
              <MenuItem onClick={openDomainControl}>Domain Control</MenuItem>
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

export default withRouter(connect(
  null,
  dispatch => bindActionCreators({ ...authAction, ...routingActions, ...settingsActions }, dispatch)
)(MainLayout) as any);
