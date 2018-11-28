import * as React from 'react';
import BaseSelect from 'react-select';
import { withTheme } from 'emotion-theming';

const SelectComponent = props => {
  const { theme } = props;

  const customStyles = {
    option: (base, state) => ({
      ...base
    }),
    control: (base, state) => ({
      ...base,
      border: `1px solid ${theme.colors.primary}`
    })
  };

  return <BaseSelect styles={customStyles} {...props} />;
};

export const Select = withTheme(SelectComponent);
export default Select;
