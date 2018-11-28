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
import modalActions from 'popup/actions/ui/modal';

import { BaseContainer } from './BaseContainer';
import { Menu, MenuItem, Icon, NeedAuth, Typography, Modal, Button, ButtonsLine, ModalContent, ModalWrap } from 'ui';

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

const actions = { ...authAction, ...routingActions, ...settingsActions, ...modalActions };
type IPropsActions = Actions<typeof actions>;
interface IProps extends IPropsActions {
  needAuth: boolean;
  location: any;
  showModal: boolean;
}

const MainLayout: React.SFC<IProps> = props => {
  const {
    logout,
    children,
    goBack,
    goMain,
    needAuth,
    location: { pathname },
    openDomainControl,
    showModal,
    cancelModal,
    confirmModal
  } = props;

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
          <HeaderItem onClick={goMain}>
            <FontAwesome name="chevron-left" />
            <Typography className={styles.buttonText} color="primary">
              Back
            </Typography>
          </HeaderItem>
        )}
      </Header>
      {needAuth ? <NeedAuth>{children}</NeedAuth> : children}
      <Modal show={showModal}>
        <ModalWrap>
          <ModalContent>
            <Typography align="center" variant="title" color="primary">
              Are you sure?
            </Typography>
            <ButtonsLine>
              <Button outlined onClick={cancelModal}>
                Cancel
              </Button>
              <Button onClick={confirmModal}>Confirm</Button>
            </ButtonsLine>
          </ModalContent>
        </ModalWrap>
      </Modal>
    </Container>
  );
};

export default withRouter(connect(
  (state: IPopup.AppState) => ({
    showModal: state.ui.modal.show
  }),
  actions
)(MainLayout as any) as any);
