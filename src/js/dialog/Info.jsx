import React from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';
import Typography from '../popup/ui/Typography';

const Container = styled.div`
  display: flex;
  align-items: ${props => (props.multi ? 'start' : 'center')};
  padding: 10px 0;
`;

const FirstItem = styled(Typography)`
  flex-shrink: 0;
  margin-right: 10px;
  flex-basis: 60px;
`;

const Content = styled.div`
  margin: ${props => props.center && 'auto'};
  overflow: hidden;
`;
const styles = {
  block: css`
    display: block;
  `
};

const Info = ({ label, content, labelColor, center }) => {
  const multi = Array.isArray(content);
  const rows = multi ? (
    <Content center>
      {content.map((item, index) => (
        <Typography
          color={index === 1 || (center && index <= 1) ? 'main' : 'secondary'}
          className={styles.block}
          key={index}
        >
          {item}
        </Typography>
      ))}
    </Content>
  ) : (
    <Typography color="secondary">{content}</Typography>
  );

  return (
    <Container multi={multi}>
      <FirstItem color={labelColor}>{label}</FirstItem>
      {rows}
    </Container>
  );
};

Info.defaultProps = {
  center: false
};

export default Info;
