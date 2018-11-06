import parse from 'url-parse';

export const strippedHost = (): string => {
  let host = location.hostname;

  // Replacing www. only if the domain starts with it.
  if(host.indexOf('www.') === 0) { host = host.replace('www.', ''); }

  return host;
};

export const parseUrlToHost = (url: string): string => {
  const URI = parse(url);
  let hostname = URI.hostname;

   // Replacing www. only if the domain starts with it.
   if(hostname.indexOf('www.') === 0) { hostname = hostname.replace('www.', ''); }

   return hostname;
  
}
