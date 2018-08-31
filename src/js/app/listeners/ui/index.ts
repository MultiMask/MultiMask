import needauth from './needauth';

export default opts => (msg, sr) => {
  needauth(opts)(msg, sr);
};
