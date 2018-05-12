import React from "react";
import App from '../../models/app';
import FontAwesome from 'react-fontawesome';

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
        }

        return (
            <div className="header">
                <div
                    onClick={this.props.onCreate}
                >
                    <FontAwesome name="plus-circle" />
                </div>
            </div>
        );
    }
}