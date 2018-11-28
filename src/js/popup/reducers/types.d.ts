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
    };
    url?: string;
  }

  export interface UI {
    profileCreate: {
      seed: string;
    };
    modal: {
      show: boolean;
      res: () => void;
      rej: () => void;
      text: string;
    }
  }

  export interface Profile {
    list: ProfileInfo[];
    current: string;
  }
}
