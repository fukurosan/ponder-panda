import React, { Component } from 'react';
import "./Dataset.scss"

class DatasetInfoCard extends Component {

    render() {
        return (
            <div className="dataset-container">
                <div className="dataset-meta-data">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td><b>Name:</b></td>
                                <td>{this.props.dataset.name}</td>
                            </tr>
                            <tr>
                                <td><b>Row Count:</b></td>
                                <td>{this.props.dataset.rows.length}</td>
                            </tr>
                            <tr>
                                <td><b>Columns:</b></td>
                                <td>{this.props.dataset.columns.map(column => column.text).join(", ")}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default DatasetInfoCard;