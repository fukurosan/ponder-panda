import React from 'react'

export default class KNNAnalysis extends React.Component {

    render() {

        return <div>
            <div className="card">
                <div className="card-header">
                    Model Result
                </div>
                <div className="card-body">
                    Model Accuracy is: <b>{this.props.analysisData.accuracy}</b>%
                </div>
            </div>
        </div>
    }
}