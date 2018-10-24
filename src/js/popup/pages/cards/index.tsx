import * as React from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

class Cards extends React.Component<any, any> {
  public render() {
    return (
      <Wrapper>
        <Item>
          <Icon name="credit-card" />
          <Info>
            <div>**** **** **** 7382</div>
            <div>04 / 24</div>
          </Info>
        </Item>
      </Wrapper>
    );
  }
}

export default connect()(Cards);

const Wrapper = styled('div')``;

const Icon = styled(FontAwesome)`
  font-size: 32px;
`;
const Item = styled('div')`
  display: flex;
  padding: 20px;
`;
const Info = styled('div')`
  margin-left: 20px;
`;
