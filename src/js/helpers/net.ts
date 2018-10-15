export const strippedHost = (): string => {
  let host = location.hostname;

  // Replacing www. only if the domain starts with it.
  if(host.indexOf('www.') === 0) host = host.replace('www.', '');

  return host;
};
