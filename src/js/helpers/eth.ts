import web3 from 'web3';

export const getTotalGas = (gasPrice: number, gasLimit: number): string => {
  const totalGas = (gasPrice * gasLimit).toString();
  const totalGasWei = web3.utils.fromWei(totalGas, 'gwei');
  // TODO: Fix cast
  return totalGasWei as string;
};
