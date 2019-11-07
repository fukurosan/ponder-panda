import React from 'react'
import Navbar from '../../Layout/Navbar'
import Footer from '../../Layout/Footer'
import CreateNewModal from '../../Dataset/CreateNewModal'
import { parseFileToDataset } from '../../../Services/Parser'
import ConfigTab from './ConfigTabs/ConfigTab'
import { initGradientDescent, initKNearestNeighbor, initSentimentAnalysis } from '../../../Services/ml/ML'
import AnalysisTab from './AnalysisTabs/AnalysisTab';

export default class Express extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            //Component
            currentTab: "blank",
            tabs: ["blank", "configure", "analysis"],
            showCreateModal: false,
            isApplying: false,

            //Dataset
            dataset: null,
            algorithm: "empty",
            algorithmList: ["Gradient Descent", "K Nearest Neighbor", "Sentiment Analysis"],
            config: {},
            analysisData: null
        }
    }

    handleChangeAlgorithm(algorithm) {
        this.setState({
            algorithm: algorithm,
        })
    }

    handleChangeConfig(config) {
        this.setState({
            config: config
        })
    }

    handleChangeTab(newTab) {
        this.setState({
            currentTab: newTab
        })
    }

    apply() {
        this.setState({
            isApplying: true
        })

        //the least messy way to ensure that all sub components update their GUI on time seems to be a timeout
        //I don't have to like it, though.
        setTimeout(() => {

            if (this.state.algorithm === "Gradient Descent") {
                let model = initGradientDescent(
                    this.state.dataset,
                    this.state.config.selectedLabel,
                    this.state.config.selectedFeatures,
                    this.state.config.testSizePercent,
                    parseFloat(this.state.config.learningRate),
                    parseInt(this.state.config.iterations),
                    parseInt(this.state.config.batchSize)
                )
                this.setState({
                    isApplying: false,
                    analysisData: model,
                    currentTab: "analysis"
                })
            }

            else if (this.state.algorithm === "K Nearest Neighbor") {
                let model = initKNearestNeighbor(
                    this.state.dataset,
                    this.state.config.selectedLabel,
                    this.state.config.selectedFeatures,
                    this.state.config.testSizePercent
                )
                this.setState({
                    isApplying: false,
                    analysisData: model,
                    currentTab: "analysis"
                })
            }

            else if (this.state.algorithm === "Sentiment Analysis") {
                let model = initSentimentAnalysis(
                    this.state.dataset,
                    this.state.config.selectedLabel,
                )
                this.setState({
                    isApplying: false,
                    analysisData: model,
                    currentTab: "analysis"
                })
            }

            else {
                console.error("No such analysis")
                this.setState({
                    isApplying: false,
                })
            }

        }, 100)
    }

    getContent() {
        switch (this.state.currentTab) {
            case "blank":
                return ""
            case "configure":
                return (
                    <ConfigTab
                        dataset={this.state.dataset}
                        algorithm={this.state.algorithm}
                        config={this.state.config}
                        isApplying={this.state.isApplying}
                        algorithmList={this.state.algorithmList}
                        handleApply={() => { this.apply() }}
                        handleChangeAlgorithm={(algorithm) => { this.handleChangeAlgorithm(algorithm) }}
                        handleChangeConfig={(config) => { this.handleChangeConfig(config) }}
                    />
                )
            case "analysis":
                return <AnalysisTab
                    dataset={this.state.dataset}
                    algorithm={this.state.algorithm}
                    config={this.state.config}
                    isApplying={this.state.isApplying}
                    analysisData={this.state.analysisData}
                />
            default:
                return null
        }
    }

    showCreateModal = (file) => {
        this.setState({ showCreateModal: !this.state.showCreateModal }, () => {
            if (file !== undefined && file.data !== undefined) {
                const dataset = parseFileToDataset(file)
                this.setState({
                    dataset: dataset,
                    currentTab: "configure",
                    algorithm: "empty",
                    config: {}
                })
            }
        })
    }

    render() {

        const content = this.getContent()
        const configTabClasses = "nav-link" + (this.state.currentTab === "configure" ? " active" : "")
        const analyzeTabClasses = "nav-link" + (this.state.currentTab === "analysis" ? " active" : "")

        return <div>
            <div className="non-footer-content">
                <Navbar />
                <div className="container">
                    <h1>In-Browser Analysis</h1>
                    {this.state.showCreateModal ?
                        <CreateNewModal onClose={this.showCreateModal} action="return" />
                        : null}
                    {this.state.dataset === null ?
                        <button className="panda-button" onClick={this.showCreateModal}>Select File</button>
                        :
                        <React.Fragment>
                            <ul className="nav nav-tabs nav-justified mb-3">
                                <li className="nav-item">
                                    <a className={configTabClasses} href="# " onClick={(e) => { e.preventDefault(); this.handleChangeTab("configure") }}>Configure</a>
                                </li>
                                <li className="nav-item">
                                    <a className={analyzeTabClasses} href="# " onClick={(e) => { e.preventDefault(); this.handleChangeTab("analysis") }}>Analysis</a>
                                </li>
                            </ul>
                            {content}
                        </React.Fragment>
                    }
                </div>
            </div>
            <Footer />
        </div>
    }
}