import * as PropTypes from 'prop-types';
import * as React from 'react';
import styled from 'react-emotion';

const iconTypes = {
  BTC: require('./Icon_type_btc.svg'),
  ETH: require('./Icon_type_eth.svg'),
  DVC: require('./Icon_type_dvc.svg'),
  'no-wallets': require('./Icon_type_no-wallets.png')
};

const IconInner = styled('span')`
  display: inline-block;
  text-align: center;
  min-width: 1em;
  height: 1em;
  line-height: 1;
  font-size: ${({ size }: any) => {
    switch (size) {
      case 's':
        return '25px';
      case 'xl':
        return '80px';
      case 'l':
      case 'm':
      default:
        return '35px';
    }
  }};
`;
const IconImg = styled('img')`
  height: 100%;
  width: auto;
`;

export class Icon extends React.Component<any, any> {
  get icon() {
    return this.props.type ? <IconImg src={iconTypes[this.props.type]} alt={this.props.type} /> : null;
  }

  render() {
    const { size } = this.props;

    return <IconInner {...{ size }}>{this.icon}</IconInner>;
  }

  static defaultProps = {
    size: 'm'
  };

  static propTypes = {
    type: PropTypes.oneOf(['BTC', 'DVC', 'ETH', 'no-wallets']).isRequired,
    size: PropTypes.oneOf(['s', 'm', 'l', 'xl'])
  };
}
