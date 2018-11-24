export class Randomizer {
  public static rand() {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] / (0xffffffff + 1);
  }

  /***
   * Generates a random string of specified size
   * @param size - The length of the string to generate
   * @returns {string} - The generated random string
   */
  public static text(size: number): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < size; i++) {
      text += possible.charAt(Math.floor(Randomizer.rand() * possible.length));
    }
    return text;
  }

  /***
   * Generates a random number in hex format of specified size
   * @param size - The length of the number to generate
   * @returns {string} - The generated random number ( as a string )
   */
  public static hex(size: number = 8): string {
    let text = '';
    const possible = '012345678abcdef';
    for (let i = 0; i < size; i++) {
      text += possible.charAt(Math.floor(Randomizer.rand() * possible.length));
    }
    return text;
  }

  /***
   * Generates a random number of specified size
   * @param size - The length of the number to generate
   * @returns {string} - The generated random number ( as a string )
   */
  public static numeric(size: number): string {
    const add = 1;
    let max = 12 - add;

    if (size > max) {
      return Randomizer.numeric(max) + Randomizer.numeric(size - max);
    }

    max = Math.pow(10, size + add);
    const min = max / 10,
      number = Math.floor(Randomizer.rand() * (max - min + 1)) + min;

    return ('' + number).substring(add);
  }
}
