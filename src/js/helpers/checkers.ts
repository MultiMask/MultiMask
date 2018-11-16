/**
 * Check that string is seed Phrase
 * @param seed 
 * @param size 
 */
export const isSeed = (seed: string, size: number = 12): boolean => {
  if (!seed) { return false; }

  return seed.match(/([a-z]{1,})/g).length === size;
}
