import React from "react";

export default class Wallet extends React.Component {
    render() {
        return (
            <div className="header center">
                <div>
                    <h4>
                        Choose network:
                    </h4>
                    <select>
                        <option value="bicoin">Bitcoin</option>
                        <option value="karma">Karma</option>
                    </select>
                </div>
                <button
                    onClick={this.handleDone}
                    className="login__create btn primary"
                >
                    create
                </button>
            </div>
        );
    }
}