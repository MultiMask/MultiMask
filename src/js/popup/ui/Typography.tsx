import * as React from 'react';
import styled from 'react-emotion';

interface Typography {
  children?: any;
  className?: any;
  headlineMapping?: any;
  variant?: any;
  color?: string;
  align?: string;
  onClick?: any;
}

interface Props {
  theme?: any;
  align?: string;
  color?: string;
  onClick?: any;
}

const Typography: React.SFC<Typography> = ({ children, headlineMapping, variant, ...props }) => {
  const headline = headlineMapping[variant] || 'span';
  const Component = styled(headline)`
    color: ${(props: Props) => props.theme.colors[props.color]};
    text-align: ${(props: Props) => props.align};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
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
    body1: 'p',
    div: 'div'
  },
  align: 'inherit'
};

export default Typography;
