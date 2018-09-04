import * as React from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';
import Typography from '../popup/ui/Typography';

type ContainerProps = { multi: boolean; }
const Container = styled('div')`
  display: flex;
  align-items: ${(props: ContainerProps) => (props.multi ? 'start' : 'center')};
  padding: 10px 0;
`;

const FirstItem = styled(Typography)`
  flex-shrink: 0;
  margin-right: 10px;
  flex-basis: 60px;
`;

type ContentProps = { center: boolean; }
const Content = styled('div')`
  margin: ${(props: ContentProps) => props.center && 'auto'};
  overflow: hidden;
`;
const styles = {
  block: css`
    display: block;
    margin: 0;
  `
};

const Info: React.SFC<any> = ({ label, content, labelColor, center }) => {
  const multi = Array.isArray(content);
  const rows = multi ? (
    <Content center>
      {content.map((item, index) => (
        <Typography
          color={index === 1 || (center && index < 1) ? 'main' : 'secondary'}
          variant={center && 'subheading'}
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
      <FirstItem color="primary">{label}</FirstItem>
      {rows}
    </Container>
  );
};

Info.defaultProps = {
  center: false
};

export default Info;
