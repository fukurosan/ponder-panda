import React from 'react'
import Navbar from '../../Layout/Navbar'
import Footer from '../../Layout/Footer'
import DatasetInfoCard from '../../Dataset/DatasetInfoCard'
import CreateNewModal from '../../Dataset/CreateNewModal'
import Card from '../../Card/Card'
import CardList from '../../CardList/CardList'
import Spinner from '../../Spinner/Spinner'

export default class Datasets extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            showCreateModal: false,
            datasets: []
        }
    }

    componentDidMount() {
        //Grab data from online
        //Grab testdata for now!
        this.loadData()
    }

    loadData() {
        this.setState({
            isLoading: true
        })
        const datasets = [
            {
                id: "1",
                name: "My Cool Dataset 1",
                columns: [{text: "Column 1"}, {text: "Column 2"}, {text: "Column 3"}],
                rows: []
            },
            {
                id: "2",
                name: "My Second Dataset",
                columns: [{text: "Column 1"}, {text: "Column 2"}, {text: "Column 3"}],
                rows: []
            },
            {
                id: "3",
                name: "Some Data",
                columns: [{text: "Column 1"}, {text: "Column 2"}, {text: "Column 3"}],
                rows: []
            }
        ]

        setTimeout(() => {
            this.setState({
                isLoading: false,
                datasets: datasets
            })
        }, 1000)
    }

    showCreateModal = () => {
        this.setState({ showCreateModal: !this.state.showCreateModal }, () => {
            if (!this.state.showCreateModal) {
                this.loadData()
            }
        })
    }

    render() {

        const cards = this.state.datasets.map(ds => {
            return <Card name={ds.name} type="dataset" content={<DatasetInfoCard dataset={ds} />} key={ds.name + Math.random()} />
        })

        return <div>
            <div className="non-footer-content">
                <Navbar />
                <div className="container">
                    <h1>Panda Cloud Datasets</h1>
                    {this.state.isLoading ? <React.Fragment>Contactig panda servers...&nbsp;<Spinner size="sm" /></React.Fragment>
                        :
                        <React.Fragment>
                            <button className="panda-button" onClick={this.showCreateModal}>Create New Dataset</button>
                            {this.state.showCreateModal ?
                                <CreateNewModal onClose={this.showCreateModal} action={"upload"} />
                                : null}
                            <CardList>
                                {cards}
                            </CardList>
                        </React.Fragment>
                    }
                </div>
            </div>
            <Footer />
        </div>
    }
}