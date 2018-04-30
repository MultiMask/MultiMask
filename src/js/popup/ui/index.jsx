import React from "react";

import Header from "./header";

export default class Wrapper extends React.Component {
    render() {
        return (
            <div className="center">
                <Header 
                    onCreate={this.props.onCreate}
                />
                {this.props.children}
            </div>
        );
    }
}