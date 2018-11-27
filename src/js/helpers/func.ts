import BN from 'bn.js';

/***
 * Flattens an array into a single dimension
 * @param array
 * @returns {*}
 */
export function flatten<T> (array: T[][]): T[] {
  return array.reduce((a, b) => a.concat(Array.isArray(b) ? this.flatten(b) : b), []);
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
    arr.push(tmpStr.substring(0, 2));
    tmpStr = tmpStr.substring(2);
  }

  return arr;
};

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
};

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
    c = String.fromCharCode(h2d(arr[i]));
    str += c;
  }

  return str;
};

/**
 * Converts a `Buffer` into a hex `String`
 * @param {Buffer} buf
 * @return {String}
 */
export const bufferToHex = (buf: Buffer | Uint8Array): string => {
  const buff = toBuffer(buf);
  return '0x' + buff.toString('hex');
};

/**
 * Convert to Buffer all staff
 * @param v
 */
export const toBuffer = (v): Buffer => {
  if (!Buffer.isBuffer(v)) {
    if (Array.isArray(v)) {
      v = Buffer.from(v);
    } else if (typeof v === 'string') {
      if (isHexString(v)) {
        v = Buffer.from(padToEven(exports.stripHexPrefix(v)), 'hex');
      } else {
        v = Buffer.from(v);
      }
    } else if (typeof v === 'number') {
      v = exports.intToBuffer(v);
    } else if (v === null || v === undefined) {
      v = Buffer.allocUnsafe(0);
    } else if (BN.isBN(v)) {
      v = v.toArrayLike(Buffer as any);
    } else if (v.toArray) {
      // converts a BN to a Buffer
      v = Buffer.from(v.toArray());
    } else {
      throw new Error('invalid type');
    }
  }
  return v;
};

/**
 * Pads a `String` to have an even length
 * @param {String} value
 * @return {String} output
 */
export function padToEven (value) {
  let a = value;

  if (typeof a !== 'string') {
    throw new Error(`while padding to even, value must be string, is currently ${typeof a}, while padToEven.`);
  }

  if (a.length % 2) {
    a = `0${a}`;
  }

  return a;
}

/**
 * Is the string a hex string.
 *
 * @method check if string is hex string of specific length
 * @param {String} value
 * @param {Number} length
 * @returns {Boolean} output the string is a hex string
 */
export function isHexString (value, length?) {
  if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false;
  }

  if (length && value.length !== 2 + 2 * length) {
    return false;
  }

  return true;
}

export function stripHexPrefix (str) {
  if (typeof str !== 'string') {
    return str;
  }

  return isHexString(str) ? str.slice(2) : str;
}

/**
 * Converts an `Number` to a `Buffer`
 * @param {Number} i
 * @return {Buffer}
 */
function intToBuffer (i) {
  const hex = intToHex(i);

  return new Buffer(padToEven(hex.slice(2)), 'hex');
}

/**
 * Converts a `Number` into a hex `String`
 * @param {Number} i
 * @return {String}
 */
function intToHex (i) {
  const hex = i.toString(16);

  return `0x${hex}`;
}
