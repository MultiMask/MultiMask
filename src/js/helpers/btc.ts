export const toSatoshi = str => Math.floor(parseFloat(str) * 1e8);

export const calcTxBalance = tx => {
  const inbox = tx.incoming && tx.incoming.value ? tx.incoming.value : 0;
  const out = tx.outgoing && tx.outgoing.value ? tx.outgoing.value : 0;

  return inbox - out;
};
