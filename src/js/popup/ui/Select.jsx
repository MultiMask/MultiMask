import React from 'react';
import BaseSelect from 'react-select';
import styled from 'react-emotion';
import { withTheme } from 'emotion-theming';

const Select = props => {
  const { theme } = props;

  const customStyles = {
    option: (base, state) => ({
      ...base
    }),
    container: (base, state) => ({
      ...base,
      flexGrow: 1
    }),
    control: (base, state) => ({
      ...base,
      border: `1px solid ${theme.colors.primary}`
    })
  };
  console.log(props);

  return <BaseSelect styles={customStyles} {...props} />;
};

export default withTheme(Select);
