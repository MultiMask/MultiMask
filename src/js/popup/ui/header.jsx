import React from "react";
import App from '../../models/app';

export default class Header extends React.Component {

    hasAccount() {
        return App.getAccounts().length > 0;
    }

    render() {
        if (this.hasAccount()) {
            return (
                <div className="header">
                    Header
                </div>
            );
        } else {
            return (
                <div className="header center">
                    <div className="btn primary"
                        onClick={this.props.onCreate}    
                    >
                        Create new Wallet
                    </div>
                </div>
            );
        }
    }
}