declare namespace IPopup.State {
  export interface Accounts {
    accounts: any[];
    seed: string;
  }

  export interface Router {
    action: string;
    location: {
      pathname: string;
      hash: string;
      search: string;
      state: string;
    }
    url?: string;
  }
}