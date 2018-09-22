/***
 * This is just a helper to manage resolving fake-async
 * requests using browser messaging.
 */
export class DanglingResolver {
  public id;
  public resolve;
  public reject;

  constructor (_id, _resolve, _reject) {
    this.id = _id;
    this.resolve = _resolve;
    this.reject = _reject;
  }
}
