import * as React from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import settingsActions from '../actions/settings';

import { Checkbox, Select, Typography } from 'ui';

class Settings extends React.Component<any, any> {
  public onChangeCurrenciesDataProvider;

  constructor (props) {
    super(props);

    this.onChangeCurrenciesDataProvider = this.onChangeSelect.bind(this, 'price_provider');
  }

  get selectedDataProvider () {
    const { settings } = this.props;
    const { price_providers = [] } = settings;

    return price_providers.find(i => i.value === settings.price_provider);
  }

  public onChange = e => {
    const { target } = e;

    if (typeof this.props.setSetting !== 'function') {
      return;
    }

    switch (target.name) {
      case 'show_total':
        typeof this.props.setSetting(target.name, target.checked);
        break;
      default:
    }
  };

  public onChangeSelect = (name, nextProvider) => {
    // if (name && nextProvider) {
    //   this.setState(state => {
    //     const nextState = { ...state };
    //     nextState.settings[name] = parseInt(nextProvider.value, 10);
    //     return nextState;
    //   });
    // }
  };

  get debug () {
    return <pre>{JSON.stringify({ state: this.state, props: this.props }, null, 4)}</pre>;
  }

  public render () {
    const { settings } = this.props;

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
            options={this.props.settings.price_providers}
            value={this.selectedDataProvider}
            onChange={this.onChangeCurrenciesDataProvider}
          />
        </Section>
      </Form>
    );
  }
}

export default connect(
  ({ settings }: any) => ({ settings }),
  dispatch =>
    bindActionCreators(
      {
        setSetting: settingsActions.setSetting
      },
      dispatch
    )
)(Settings);

const Form = styled('div')`
  display: flex;
  padding: 0 20px;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

interface SectionProps {
  centered?: boolean;
  style?: any;
}
const Section = styled('div')`
  padding: 30px 0;
  text-align: ${({ centered }: SectionProps) => (centered ? 'center' : void 0)};
`;

const Hr = styled('hr')`
  height: 1px;
  width: 100%;
  background-color: #dee3ec;
  border: none;
`;
