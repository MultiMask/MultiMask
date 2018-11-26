import * as bip39 from 'bip39';

/**
 * Check that string is seed Phrase
 * @param seed
 * @param size
 */
export const isSeed = (seed: string, size: number = 12): boolean => {
  if (!seed) {
    return false;
  }

  const words = seed.split(' ');
    
  return words.every(word => bip39.wordlists.EN.includes(word)) && words.length >= 12;
};
