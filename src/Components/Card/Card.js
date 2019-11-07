import React, { Component } from 'react';
import { UserContext } from '../../Contexts/UserContext'
import './Card.scss'


export default class Card extends Component {

    render() {
        return (
            <UserContext.Consumer>
                {(userContext) => (
                    <React.Fragment>
                        <CardInner
                            userContext={userContext}
                            {...this.props}
                        />
                    </React.Fragment>
                )}
            </UserContext.Consumer>
        );
    }
}

class CardInner extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showContent: false,
            types: {
                dataset: "fas fa-database card-header-icon"
            }
        }
    }

    trimName = (name) => {
        const length = 35;
        let trimmedString = name.substring(0, length);
        if (name.length > length) {
            trimmedString = trimmedString + '…';
        }
        return trimmedString;
    }

    showContent = () => {
        this.setState({
            showContent: !this.state.showContent
        })
    }

    render() {
        
        const name = this.trimName(this.props.name)
        const icon = <i className={this.state.types[this.props.type]}></i>
        const bodyClasses = "card-body card-body-hide-content " + (this.state.showContent ? "card-body-show-content" : "") 
        const cardBody = <div className={bodyClasses}>{this.props.content}</div>

        return (
            <div className="card panda-card">
                <div className="card-header" style={{ cursor: "pointer" }} onClick={() => { this.showContent() }}>
                    {icon}{name}
                </div>
                {cardBody}
            </div>
        )
    }
}
