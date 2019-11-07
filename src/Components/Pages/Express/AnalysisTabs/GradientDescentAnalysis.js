import React from 'react'
import LineChart from '../../../Charts/LineChart'

export default class GDAnalysis extends React.Component {

    render() {

        const lineChartCostSeries = [
            {
                name: "Cost over time",
                data: this.props.analysisData.costHistory.slice().reverse()
            }
        ]

        return <div>
            <div className="card">
                <div className="card-header">
                    Model Result
                </div>
                <div className="card-body">
                    Model Accuracy is: <b>{this.props.analysisData.accuracy}</b>%
                    <br />
                    <LineChart id={"" + Math.random()} title="Cost over time" yAxisText="Cost" series={lineChartCostSeries}  />
                </div>
            </div>
        </div>
    }
}