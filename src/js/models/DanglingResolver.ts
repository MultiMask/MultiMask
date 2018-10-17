/***
 * This is just a helper to manage resolving fake-async
 * requests using browser messaging.
 */
export class DanglingResolver {
  public id;
  public resolve;
  public reject;

  constructor (id, resolve, reject) {
    this.id = id;
    this.resolve = resolve;
    this.reject = reject;
  }
}
