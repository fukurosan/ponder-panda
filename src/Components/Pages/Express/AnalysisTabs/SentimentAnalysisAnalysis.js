import React from 'react'

export default class SAAAnalysis extends React.Component {

    render() {

        return <div>
            <div className="card">
                <div className="card-header">
                    Analysis Result
                </div>
                <div className="card-body">
                    The average comparative value is: <b>{this.props.analysisData.comparative}</b>
                </div>
            </div>
        </div>
    }
}