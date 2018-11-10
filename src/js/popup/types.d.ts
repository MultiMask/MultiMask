/**
 * Namespace for Popup's staff
 */
declare namespace IPopup {
  /**
   * Popup app redux state
   */
  export interface AppState {
    account: State.Accounts;
    router: State.Router;
    ui: State.UI;
  }
}

type OmitMiddleFunction<T> = T extends (...args: infer A1) => (...args: any[]) => infer F ? (...args: A1) => F : never;
type Actions<T> = { [K in keyof T]: OmitMiddleFunction<T[K]> };

type GetStateFn = () => IPopup.AppState;
