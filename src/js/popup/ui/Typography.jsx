import React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';

const Typography = ({ children, headlineMapping, variant, ...props }) => {
  const headline = headlineMapping[variant] || 'span';
  const Component = styled(headline)`
    color: ${props => props.theme.colors[props.color]};
    text-align: ${props.align};
  `;

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
  align: 'inherit'
};

export default Typography;
