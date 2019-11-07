import React from 'react'
import GradientDescentAnalysis from './GradientDescentAnalysis'
import KNearestNeighborDescentAnalysis from './KNearestNeighborAnalysis'
import SentimentAnalysisAnalysis from './SentimentAnalysisAnalysis'

export default class AnalysisTab extends React.Component {

    getContent() {
        //Each algorithm has it's own analysis component
        switch (this.props.algorithm) {
            case "Gradient Descent":
                return <GradientDescentAnalysis
                    dataset={this.props.dataset}
                    {...this.props.config}
                    analysisData={this.props.analysisData}
                    isApplying={this.props.isApplying}
                />
            case "K Nearest Neighbor":
                return <KNearestNeighborDescentAnalysis
                    dataset={this.props.dataset}
                    {...this.props.config}
                    analysisData={this.props.analysisData}
                    isApplying={this.props.isApplying}
                />
            case "Sentiment Analysis":
                return <SentimentAnalysisAnalysis
                    dataset={this.props.dataset}
                    {...this.props.config}
                    analysisData={this.props.analysisData}
                    isApplying={this.props.isApplying}
                />
            default:
                return "Nothing to analyze yet."
        }
    }

    render() {

        const content = this.getContent()

        return <div>
            {content}
        </div >
    }
}