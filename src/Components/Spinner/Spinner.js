import React from 'react'

export default class Spinner extends React.Component {

    render() {
        return <span className={"spinner-border spinner-border-" + this.props.size} role="status" aria-hidden="true"></span>
    }
}