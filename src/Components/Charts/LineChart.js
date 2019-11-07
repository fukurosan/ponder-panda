import React from "react";
import Highcharts from "highcharts";

export default class LineChart extends React.Component {

    componentWillUnmount() {
        this.myChart.destroy();
    }

    componentDidMount() {
        console.log(this.props.series)
        this.myChart = Highcharts.chart(this.props.id, {
            chart: {
                type: 'line'
            },
            title: {
                text: this.props.title
            },
            xAxis: {
                categories: this.props.xAxis
            },
            yAxis: {
                title: {
                    text: this.props.yAxisText
                }
            },
            series: this.props.series,
            credits: {
                enabled: false
            }
        }
        );
    }

    render() {
        return <div id={this.props.id}></div>
    }
}
