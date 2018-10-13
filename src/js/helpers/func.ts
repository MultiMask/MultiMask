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
