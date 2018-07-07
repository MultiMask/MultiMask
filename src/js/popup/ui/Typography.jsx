import React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';

const Typography = ({ children, headlineMapping, variant, ...props }) => {
  const Component = styled(headlineMapping[variant])(props => ({
    color: props.theme.colors[props.color],
    textAlign: props.align
  }));
  return <Component {...props}>{children}</Component>;
};

Typography.defaultProps = {
  color: 'main',
  headlineMapping: {
    headline: 'h1',
    title: 'h2',
    subheading: 'h3',
    body2: 'aside',
    body1: 'p'
  },
  variant: 'body1',
  align: 'inherit'
};

export default Typography;
