import React, { Component } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Checkbox from '../../../popup/ui/Checkbox';
import Select from '../../../popup/ui/Select';
import Typography from '../../../popup/ui/Typography';
import settingsActions from '../../actions/settings';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = { settings: { show_total: true, currencies_data_provider: 3 } };

    this.onChangeCurrenciesDataProvider = this.onChangeSelect.bind(this, 'currencies_data_provider');
  }

  currenciesDataProviders = 'some data'.split('').map((val, key) => ({
    value: key,
    label: val
  }));

  get selectedDataProvider() {
    const { settings } = this.state;

    return this.currenciesDataProviders.find(i => i.value === settings.currencies_data_provider);
  }

  onChange = e => {
    const { target } = e;

    this.setState(state => {
      const nextState = { ...state };

      switch (target.name) {
        case 'show_total':
          nextState.settings[target.name] = target.checked;
          break;
        default:
          nextState.settings[target.name] = target.value;
      }

      return nextState;
    });
  };

  onChangeSelect = (name, nextProvider) => {
    if (name && nextProvider) {
      this.setState(state => {
        const nextState = { ...state };

        nextState.settings[name] = parseInt(nextProvider.value, 10);

        return nextState;
      });
    }
  };

  get debug() {
    return <pre>{JSON.stringify(this.state, null, 4)}</pre>;
  }

  render() {
    const { settings } = this.state;
    return (
      <Form>
        <Section>
          <Checkbox name="show_total" label="Show total" checked={settings.show_total} onChange={this.onChange} />
        </Section>
        <Hr />
        <Section style={{ flexGrow: '1' }} centered>
          <Typography color="main" variant="subheading">
            Currency data provider
          </Typography>
          <Select
            options={this.currenciesDataProviders}
            value={this.selectedDataProvider}
            onChange={this.onChangeCurrenciesDataProvider}
          />
        </Section>
      </Form>
    );
  }
}

export default connect(
  () => ({}),
  dispatch => bindActionCreators(settingsActions, dispatch)
)(Settings);

const Form = styled.div`
  display: flex;
  padding: 0 20px;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const Section = styled.dev`
  padding: 30px 0;
  text-align: ${({ centered }) => (centered ? 'center' : void 0)};
`;

const Hr = styled.hr`
  height: 1px;
  width: 100%;
  background-color: #dee3ec;
  border: none;
`;
