import React from "react";

import Bitcoin from "./bitcoin";

export default class TXS extends React.Component {
  get txComponent() {
    const { account } = this.props;
    switch (account.network) {
      case "bitcoin": {
        return <Bitcoin account={account} />;
      }
    }
    return null;
  }

  render() {
    return this.txComponent;
  }
}
