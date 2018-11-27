import * as PropTypes from 'prop-types';
import * as React from 'react';
import styled from 'react-emotion';

const iconTypes = {
  BTC: require('./Icon_type_btc.svg'),
  ETH: require('./Icon_type_eth.svg'),
  EOS: require('./Icon_type_eos.svg'),
  LTC: require('./Icon_type_ltc.svg'),
  DOGE: require('./Icon_type_doge.svg'),
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

export class BcIcon extends React.Component<any, any> {
  get icon() {
    return this.props.type ? <IconImg src={iconTypes[this.props.type]} alt={this.props.type} /> : null;
  }

  public render() {
    const { size } = this.props;

    return <IconInner {...{ size }}>{this.icon}</IconInner>;
  }

  public static defaultProps = {
    size: 'm'
  };

  public static propTypes = {
    type: PropTypes.oneOf(['BTC', 'ETH', 'EOS', 'LTC', 'DOGE', 'no-wallets']).isRequired,
    size: PropTypes.oneOf(['s', 'm', 'l', 'xl'])
  };
}
