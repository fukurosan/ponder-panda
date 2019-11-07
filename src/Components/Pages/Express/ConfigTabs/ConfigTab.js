import React from 'react'
import DatasetInfoCard from '../../../Dataset/DatasetInfoCard'
import GradientDescentConfig from './GradientDescentConfig'
import KNearestNeighborDescentConfig from './KNearestNeighborConfig'
import SentimentAnalysisConfig from './SentimentAnalysisConfig'

export default class ConfigTab extends React.Component {

    getContent() {
        //Each algorithm has it's own configuration component
        switch (this.props.algorithm) {
            case "Gradient Descent":
                return <GradientDescentConfig
                    dataset={this.props.dataset}
                    {...this.props.config}
                    handleChangeConfig={(config) => this.handleChangeConfig(config)}
                    handleApply={this.props.handleApply}
                    isApplying={this.props.isApplying}
                />
            case "K Nearest Neighbor":
                return <KNearestNeighborDescentConfig
                    dataset={this.props.dataset}
                    {...this.props.config}
                    handleChangeConfig={(config) => this.handleChangeConfig(config)}
                    handleApply={this.props.handleApply}
                    isApplying={this.props.isApplying}
                />
            case "Sentiment Analysis":
                return <SentimentAnalysisConfig
                    dataset={this.props.dataset}
                    {...this.props.config}
                    handleChangeConfig={(config) => this.handleChangeConfig(config)}
                    handleApply={this.props.handleApply}
                    isApplying={this.props.isApplying}
                />
            default:
                return null
        }
    }

    getAlgorithms() {
        return this.props.algorithmList.map(algorithm => {
            return <option value={algorithm} key={algorithm}>{algorithm}</option>
        })
    }

    handleChangeAlgorithm(algorithm) {

        //Set the default config for algorithm
        switch (algorithm) {
            case "Gradient Descent":
                this.props.handleChangeConfig({
                    selectedLabel: "empty",
                    selectedFeatures: [],
                    testSizePercent: 20,
                    learningRate: 0.01,
                    iterations: 0,
                    batchSize: 0,
                })
                break;
            case "K Nearest Neighbor":
                this.props.handleChangeConfig({
                    selectedLabel: "empty",
                    selectedFeatures: [],
                    testSizePercent: 20,
                })
                break;
            case "Sentiment Analysis":
                this.props.handleChangeConfig({
                    selectedLabel: "empty",
                })
                break;
            default:
                break;
        }

        //Then set algorithm
        this.props.handleChangeAlgorithm(algorithm)
    }

    handleChangeConfig(config) {
        this.props.handleChangeConfig({
            ...this.props.config,
            ...config
        })
    }

    handleApply() {
        this.props.handleApply()
    }

    render() {

        const configCard = this.getContent()
        const algorithms = this.getAlgorithms()

        return <div>
            <div className="card mb-3">
                <div className="card-header">
                    File information
                            </div>
                <div className="card-body">
                    <DatasetInfoCard dataset={this.props.dataset} />
                    <button className="panda-button" onClick={this.props.showCreateModal}>Change File</button>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-header">
                    Prediction Algorithm
                            </div>
                <div className="card-body">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="algorithmSelect" className="col-sm-2 col-form-label"><b>Algorithm</b></label>
                            <div className="col-sm-10">
                                <select
                                    className="form-control"
                                    id="algorithmSelect"
                                    value={this.props.algorithm}
                                    disabled={this.props.isApplying}
                                    onChange={(e) => { this.handleChangeAlgorithm(e.target.value) }}
                                >
                                    <option value="empty">Select Algorithm...</option>
                                    {algorithms}
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {configCard}
        </div >
    }
}