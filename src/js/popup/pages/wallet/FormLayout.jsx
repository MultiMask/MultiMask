import React from 'react';
import styled from 'react-emotion';
import Button from '../../ui/Button';
import Typography from '../../ui/Typography';

const FormLayout = ({ children, title }) => (
  <Container>
    <Content>
      <Typography color="main" variant="title">
        {title}
      </Typography>
      {children}
    </Content>

    <Actions>
      <Button outlined onClick={this.onAdd}>
        Add
      </Button>
      <Button onClick={this.handleImportProfile}>Next</Button>
    </Actions>
  </Container>
);

export default FormLayout;

const Container = styled.form`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 0 20px;
  overflow-y: auto;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 20px 0;
`;
