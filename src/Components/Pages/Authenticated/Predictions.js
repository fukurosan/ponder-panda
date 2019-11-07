import React from "react";
import Highcharts from "highcharts";
import Navbar from '../../Layout/Navbar'
import Footer from '../../Layout/Footer'

export default class Analysis extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    componentWillUnmount() {
        this.myChart.destroy();
    }

    componentDidMount() {
        let graphData = [
            {
                name: 'One',
                data: [1, 5, 2]
            },
            {
                name: 'Two',
                data: [5, 7, 3]
            }
        ];
        this.myChart = Highcharts.chart("thisChart", {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Temporary Graph'
            },
            xAxis: {
                categories: ['Cat 1', 'Cat 2', 'Cat 3']
            },
            yAxis: {
                title: {
                    text: 'Comparison'
                }
            },
            series: graphData,
            credits: {
                enabled: false
            }
        }
        );
    }

    render() {
        return (
            <div>
                <div className="non-footer-content">
                    <Navbar />
                    <div className="container">
                        <h1>Analysis</h1>
                        <br />
                        <div id="thisChart"></div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
