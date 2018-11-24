import sha256 from 'sha256';
import { Profile, IProfileChain } from 'models/Profile';

export const getParams = data => [data.substring(0, 2), data.substring(2)];
export const generateId = (bc, data): string => {
  const [type, link] = getParams(data);

  if (type === '02') {
    return `${bc}${link}`;
  }

  if (type === '01' || type === '00') {
    return `${bc}${sha256(link).substr(0, 6)}`;
  }
};

export const getWalletsCount = (profile: Profile) => {
  let count = 0;
  iterateWallets(profile.chains, () => {
    count++;
  });

  return count;
};

export const iterateWallets = (chains: IProfileChain[], cb: (wallet, bc) => void) => {
  chains.forEach(chain => {
    chain.wallets.forEach(wallet => {
      cb(wallet, chain.id);
    });
  });
};
