import networks from './../blockchain';

export default function ({ blockchain }) {
  return networks[blockchain].sign;
}
