import React from 'react'
import Spinner from '../../../Spinner/Spinner'

export default class GDConfig extends React.Component {

    handleChangeLabel(labelIndex) {
        let labelIndexNumber = labelIndex
        if (parseInt(Number(labelIndex)).toString() !== "NaN") {
            labelIndexNumber = parseInt(labelIndex)
        }

        let featureList = this.props.selectedFeatures.filter(featureIndex => { return featureIndex !== labelIndexNumber })
        this.props.handleChangeConfig({
            selectedLabel: labelIndexNumber,
            selectedFeatures: featureList
        })
    }

    handleChangeFeature(changeFeatureIndex) {
        let featureList = this.props.selectedFeatures.slice(0)
        if (this.props.selectedFeatures.indexOf(changeFeatureIndex) === -1) {
            featureList.push(changeFeatureIndex)
            this.props.handleChangeConfig({
                selectedFeatures: featureList
            })
        }
        else {
            featureList = featureList.filter(feature => { return feature !== changeFeatureIndex })
            this.props.handleChangeConfig({
                selectedFeatures: featureList
            })
        }
    }

    handleChangeTestRange(percentTest) {
        this.props.handleChangeConfig({
            testSizePercent: percentTest
        })
    }

    handleGeneralChange(attribute, value) {
        this.props.handleChangeConfig({
            [attribute]: value
        })
    }

    getFeatures() {
        return this.props.dataset.columns.map((column) => {
            return <div className="form-check" key={"feature" + column.index}>
                <input
                    className="form-check-input panda-checkbox"
                    type="checkbox"
                    id={"feature" + column.index}
                    value={column.index}
                    disabled={this.props.selectedLabel === column.index || column.type === "multinomial" || this.props.isTraining}
                    checked={this.props.selectedFeatures.indexOf(column.index) !== -1}
                    onChange={() => { this.handleChangeFeature(column.index) }}
                />
                <label className="form-check-label ml-2" htmlFor={"feature" + column.index}>{column.text}</label>
            </div>

        })
    }

    getLabels() {
        return this.props.dataset.columns.map((label) => {
            return <option value={label.index} key={"label" + label.index} disabled={label.type==="multinomial"}>{label.text}</option>
        })
    }

    getApplyButton() {
        let classes = "mt-3 panda-button"
        let caption = this.props.isApplying ?
            <div>
                <span>Web pandas are working...&nbsp;</span>
                <Spinner size="sm" />
            </div>
            : "Work"
        let shouldBeDisabled = this.props.learningRate === 0 ||
            this.props.iterations === 0 || this.props.iterations === "" ||
            this.props.batchSize === 0 || this.props.batchSize === "" ||
            this.props.selectedFeatures.length < 1 ||
            this.props.selectedLabel === "empty" ||
            this.props.testSizePercent === 0 ||
            this.props.isApplying
        if (shouldBeDisabled) {
            classes += " panda-button-disabled"
        }
        return <button
            className={classes}
            style={{ float: "right" }}
            onClick={() => { this.apply() }}
            disabled={shouldBeDisabled}>
            {caption}
        </button>
    }

    apply() {
        this.props.handleApply()
    }

    render() {

        const features = this.getFeatures()
        const labels = this.getLabels()
        const applyButton = this.getApplyButton()

        return <div>
            <div className="card">
                <div className="card-header">
                    Gradient Descent
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="labelSelect" className="col-sm-2 col-form-label"><b>Label</b></label>
                            <div className="col-sm-10">
                                <select
                                    className="form-control"
                                    id="labelSelect"
                                    value={this.props.selectedLabel}
                                    disabled={this.props.isApplying}
                                    onChange={(e) => { this.handleChangeLabel(e.target.value) }}
                                >
                                    <option value="empty">Select Label...</option>
                                    {labels}
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label"><b>Features</b></label>
                            <div className="col-sm-10">
                                {features}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="testRange" className="col-sm-2 col-form-label"><b>Test set {this.props.testSizePercent}%</b></label>
                            <div className="col-sm-10">
                                <input
                                    type="range"
                                    className="form-control-range custom-range"
                                    id="testRange"
                                    min="0"
                                    max="100"
                                    value={this.props.testSizePercent}
                                    disabled={this.props.isApplying}
                                    onChange={(e) => { this.handleChangeTestRange(e.target.value) }}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="learningRate" className="col-sm-2 col-form-label"><b>Learning Rate</b></label>
                            <div className="col-sm-10">
                                <input
                                    type="number"
                                    step="0.01"
                                    className="form-control"
                                    id="learningRate"
                                    placeholder="Learning Rate"
                                    value={this.props.learningRate}
                                    disabled={this.props.isApplying}
                                    onChange={(e) => { this.handleGeneralChange("learningRate", e.target.value) }}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="iterations" className="col-sm-2 col-form-label"><b>Iterations</b></label>
                            <div className="col-sm-10">
                                <input
                                    type="number"
                                    step="1"
                                    className="form-control"
                                    id="iterations"
                                    placeholder="Iterations"
                                    value={this.props.iterations}
                                    disabled={this.props.isApplying}
                                    onChange={(e) => { this.handleGeneralChange("iterations", e.target.value) }}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="batchSize" className="col-sm-2 col-form-label"><b>Batch Size</b></label>
                            <div className="col-sm-10">
                                <input
                                    type="number"
                                    step="1"
                                    className="form-control"
                                    id="batchSize"
                                    placeholder="Batch Size"
                                    value={this.props.batchSize}
                                    disabled={this.props.isApplying}
                                    onChange={(e) => { this.handleGeneralChange("batchSize", e.target.value) }}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {applyButton}
        </div >
    }
}