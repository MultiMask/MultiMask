import * as React from 'react';
import styled from 'react-emotion';
import Button from '../../ui/Button';
import Typography from '../../ui/Typography';

const FormLayout: React.SFC<any> = ({ children, title, onSubmit, onBack, submitButtonTitle, titleAlign }) => (
  <Container onSubmit={onSubmit}>
    <Content>
      <Typography color="main" variant="title" align={titleAlign}>
        {title}
      </Typography>
      {children}
    </Content>

    <Actions>
      {onBack && (
        <Button onClick={onBack} outlined>
          Back
        </Button>
      )}
      <Button fullWidth={!onBack} type="submit">
        {submitButtonTitle}
      </Button>
    </Actions>
  </Container>
);

FormLayout.defaultProps = {
  onBack: null,
  submitButtonTitle: 'Next'
};

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
  display: flex;
  flex-direction: column;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`;
