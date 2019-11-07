import React, { Component } from 'react';
import "./CardList.scss"

class CardList extends Component {

    render() {
        return (
            <div className="card-list">
                {this.props.children}
            </div>
        );
    }
}

export default CardList;