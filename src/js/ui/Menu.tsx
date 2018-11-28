import * as React from 'react';
import styled from 'react-emotion';
import Icon from './Icon';

const Root = styled('div')`
  position: relative;
`;

const MenuContainer = styled('div')`
  min-width: 100px;
  position: absolute;
  right: 0;
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 6px;
  padding: 15px;
  box-shadow: ${props => props.theme.shadows[0]};
  background-color: #fff;
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

export class Menu extends React.Component<any, any> {
  private dropdownMenu;

  public state = {
    showMenu: false
  };

  public static defaultProps = {
    name: 'plus-circle'
  };

  public showMenu = event => {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  };

  public closeMenu = event => {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  };

  public render() {
    const { className, name, children, iconProps } = this.props;
    return (
      <Root className={className}>
        <Icon name={name} onClick={this.showMenu} {...iconProps} />
        {this.state.showMenu ? (
          <MenuContainer
            innerRef={element => {
              this.dropdownMenu = element;
            }}
          >
            {children}
          </MenuContainer>
        ) : null}
      </Root>
    );
  }
}

export default Menu;
