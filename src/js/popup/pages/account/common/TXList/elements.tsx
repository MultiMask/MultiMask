import { css } from 'emotion';
import styled from 'react-emotion';

export const DATE_FORMAT = 'D MMMM YYYY HH:mm';

export const styles = {
  rowItem: css`
    margin-right: 5px;
  `,
  icon: css`
    cursor: pointer;
  `
};

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 30px 0 20px;
  padding: 15px 0 15px 5px;
  border-bottom: 1px solid ${props => props.theme.colors.hint};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;
