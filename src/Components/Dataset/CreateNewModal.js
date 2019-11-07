import React, { Component } from 'react';
import ModalFactory from 'fukuro-react-modal'
import Spinner from '../Spinner/Spinner'
import "./Dataset.scss"

class CreateDatasetModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileInformation: null,
            file: {},
            allowedTypes: [
                "text/csv",
                "application/vnd.ms-excel"
            ],
            isLoading: false,
            actions: ["upload", "return"]
        }
    }

    handleFileRead = (e, fileReader) => {
        const content = fileReader.result;

        const file = {
            data: content,
            name: this.state.fileInformation.name,
            type: this.state.fileInformation.type
        }

        this.setState({
            file: file
        })
    };

    handleFileChosen = (file) => {
        let fileReader = new FileReader()
        fileReader.onloadend = (e) => { this.handleFileRead(e, fileReader) }
        this.setState({ fileInformation: file })
        fileReader.readAsText(file);
    };

    getFileName = () => {
        if (this.state.file !== null) {
            return this.state.file.name
        }
        else {
            return "No file selected"
        }
    }

    handleDataUpload = () => {
        //Send file to server
        this.setState({
            buttonCaption: "Please wait...",
            isLoading: true
        })
        setTimeout(this.props.onClose, 1000)
    }

    handleReturnFile = () => {
        this.props.onClose(this.state.file)
    }

    render() {

        const fileName = this.getFileName()
        const isCorrectFileTypeSelected = this.state.allowedTypes.indexOf(this.state.file.type) !== -1
        const isDisabled = !isCorrectFileTypeSelected || this.state.isLoading

        const modalHeader = "Create New Dataset"
        const modalFooter = (
            <div>
                <button
                    className={"panda-button " + (isDisabled ? "panda-button-disabled" : "")}
                    style={{ float: "right" }}
                    onClick={this.props.action === "upload" ? this.handleDataUpload : this.handleReturnFile}
                    disabled={isDisabled}>
                    {this.state.isLoading ? (
                        <div>
                            <span>Chewing bamboo...&nbsp;</span>
                            <Spinner size="sm" />
                        </div>)
                        : "Upload"}
                </button>
            </div>
        )

        return (
            <ModalFactory modalType="RESPONSIVE" header={modalHeader} footer={modalFooter} onClose={this.props.onClose}>
                <div className="create-dataset-modal">
                    Select File<br />
                    <label className="panda-button">
                    <input type="file" onChange={(e) => { this.handleFileChosen(e.target.files[0]) }}></input>
                    Browse...
                    </label>
                    <small style={{ display: "initial" }} className="form-text text-muted">
                        {fileName}
                    </small>
                    <small className="form-text text-muted">The file should be csv format.</small>
                </div>
            </ModalFactory>
        );
    }
}

export default CreateDatasetModal;