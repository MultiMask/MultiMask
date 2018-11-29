type ProfileInfo = {
  id: string;
  name: string;
  wallets: number;
};

/**
 * Blockchain info to show in UI
 */
type BCInfo = {
  address: string;
  balance: number;
  network: string;
  raw?: any;
  txs?: any[];
};
