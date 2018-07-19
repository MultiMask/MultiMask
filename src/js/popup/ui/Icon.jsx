import React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';
import FontAwesome from 'react-fontawesome';

const dynamicStyle = props =>
  css`
    color: ${props.theme.colors[props.color] || props.theme.colors.primary};
    cursor: pointer;
  `;

const Icon = styled(FontAwesome)`
  ${dynamicStyle};
  font-size: 16px;
`;

// TODO: make IconButton with fading color for hover
export default Icon;
