import React from 'react';
import styled from 'react-emotion';
import posed from 'react-pose';

import { IPropsThemed } from 'config/theme';

const TOP_POSITION = 30;
const Box = posed.div({
  hidden: {
    top: 0,
    opacity: 0
  },
  idle: {
    top: `${TOP_POSITION}px`,
    opacity: 1
  }
});

const Notification = styled(Box)`
  position: absolute;
  top: ${TOP_POSITION}px;
  left: 50%;
  margin-left: -50px;

  box-sizing: border-box;
  padding: 5px 10px;
  width: 100px;

  text-align: center;
  background: white;
  border: 1px solid ${(props: IPropsThemed) => props.theme.colors.secondary};
  color: ${(props: IPropsThemed) => props.theme.colors.main};
`;

const Linker = styled('span')`
  cursor: pointer;
`;

interface IOwnProps extends React.Props<{}> {
  title?: string;
  text?: string;
  timeout: number;
}
interface IState {
  showNotify: boolean;
}

export class Notify extends React.Component<IOwnProps, IState> {
  public static defaultProps = {
    title: 'Copy it',
    text: 'Copied',
    timeout: 2000
  };

  public state = {
    showNotify: false
  };

  public handleClick = () => {
    this.setState(
      {
        showNotify: true
      },
      () => {
        setTimeout(() => {
          this.setState({
            showNotify: false
          });
        }, this.props.timeout);
      }
    );
  };

  public render() {
    const { text, title, children } = this.props;

    return (
      <React.Fragment>
        <Notification pose={this.state.showNotify ? 'idle' : 'hidden'}>{text}</Notification>
        <Linker title={title} onClick={this.handleClick}>
          {children}
        </Linker>
      </React.Fragment>
    );
  }
}

export default Notify;
