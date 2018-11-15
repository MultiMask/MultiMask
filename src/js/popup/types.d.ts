/**
 * Namespace for Popup's staff
 */
declare namespace IPopup {
  /**
   * Popup app redux state
   */
  export interface AppState {
    auth: any;
    account: State.Accounts;
    router: State.Router;
    profile: any;
    ui: State.UI;
    state: any;

    timestamp?: number;
  }
}

type OmitMiddleFunction<T> = T extends (...args: infer A1) => (...args: any[]) => infer F ? (...args: A1) => F : never;
type Actions<T> = { [K in keyof T]: OmitMiddleFunction<T[K]> };

type GetStateFn = () => IPopup.AppState;
