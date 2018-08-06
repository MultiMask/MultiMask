import needauth from './needauth';

export default opts => (...args) => {
  needauth(opts)(...args);
};
