import React from 'react'
import Spinner from '../../../Spinner/Spinner'

export default class SAConfig extends React.Component {

    handleChangeLabel(labelIndex) {
        let labelIndexNumber = labelIndex
        if (parseInt(Number(labelIndex)).toString() !== "NaN") {
            labelIndexNumber = parseInt(labelIndex)
        }
        this.props.handleChangeConfig({
            selectedLabel: labelIndexNumber
        })
    }

    getLabels() {
        return this.props.dataset.columns.map((label) => {
            return <option value={label.index} key={"label" + label.index} disabled={label.type !== "multinomial"}>{label.text}</option>
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
        let shouldBeDisabled = this.props.selectedLabel === "empty" ||
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

        const labels = this.getLabels()
        const applyButton = this.getApplyButton()

        return <div>
            <div className="card">
                <div className="card-header">
                    Sentiment Analysis
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
                    </form>
                </div>
            </div>

            {applyButton}
        </div >
    }
}