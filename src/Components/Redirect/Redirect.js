import React from 'react'

class Example extends React.Component {

    redirect() {
        this.props.history.push("/")
    }

    render() {
        return (
            <React.Fragment>
                {this.redirect()}
            </React.Fragment>
        );
    }
}

export default Example