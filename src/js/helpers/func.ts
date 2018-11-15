/***
* Flattens an array into a single dimension
* @param array
* @returns {*}
*/
export function flatten<T> (array: T[][]): T[] {
   return array.reduce(
       (a, b) => a.concat(Array.isArray(b) ? this.flatten(b) : b), []
   );
}

/**
 * Convert instance to plain data
 * @param data 
 * @returns {*}
 */
export function toJSON (data: any): any {
  return JSON.parse(JSON.stringify(data));
}

const d2h = (d: number) => d.toString(16);
const h2d = (h: string) => parseInt(h, 16);
const strSplitBy2 = (str: string) => {
  const arr = [];
  let tmpStr = str.slice();
  
  while (tmpStr) {
    arr.push(tmpStr.substring(0,2))
    tmpStr = tmpStr.substring(2)
  }

  return arr;
}

/**
 * Return hex encoded string
 * @param tmp 
 */
export const stringToHex = (tmp: string): string => {
  let str = '',
      i = 0,
      tmpLen = tmp.length,
      c;

  for (; i < tmpLen; i += 1) {
      c = tmp.charCodeAt(i);
      str += d2h(c);
  }
  return str;
}

/**
 * Decode hex string
 * @param tmp 
 */
export const hexToString = (tmp: string): string => {
  let arr = strSplitBy2(tmp),
    arrLen = arr.length,
    str = '',
    i = 0,
    c;

  for (; i < arrLen; i += 1) {
      c = String.fromCharCode( h2d( arr[i] ) );
      str += c;
  }

  return str;
}
