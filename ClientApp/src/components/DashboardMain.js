import React, { Component } from 'react';
import ReactDOM from "react-dom";
import "./css/styles.css";

export class DashboardMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Details: [], loading: true
        };
        fetch('/api/SampleData/getApiInfo?api=1')
            .then(response => response.json())
            .then(data => {
                this.setState({ Details: data, loading: false });
            });
    }

    static renderDetails() {
        return (
            <div className="container col-md-12">
                <div className="figureSection">
                    <strong className="figureNum"> 305 </strong>
                    <p className="figureName">USER CLICKS</p>
                </div>
                <div className="figureSection">
                    <strong className="figureNum"> $3300.00 </strong>
                    <p className="figureName">COMISSION TOTAL</p>
                </div>
                <div className="figureSection">
                    <strong className="figureNum"> $0.50 </strong>
                    <p className="figureName">EARNINGS PER CLICKS</p>
                </div>
                <div className="figureSection">
                    <strong className="figureNum"> $2.51 </strong>
                    <p className="figureName">EARNINGS PER USER</p>
                </div>
                <div className="figureSection">
                    <strong className="figureNum"> N/A </strong>
                    <p className="figureName">COVERSION RATE</p>
                </div>
            </div>
        );
    }

    render() {
        let values = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderDetails();

        return (
            <div className="container justify-content-center col-md-12 center">
                <h1 className="center-text">Mattress Zone Summary Dashboard</h1>
                <form>
                    <div className="container col-md-12">
                        <div className="figureSection">
                            <strong className="figureNum"> 305 </strong>
                            <p className="figureName">USER CLICKS</p>
                        </div>
                        <div className="figureSection">
                            <strong className="figureNum"> $3300.00 </strong>
                            <p className="figureName">COMISSION TOTAL</p>
                        </div>
                        <div className="figureSection">
                            <strong className="figureNum"> $0.50 </strong>
                            <p className="figureName">EARNINGS PER CLICKS</p>
                        </div>
                        <div className="figureSection">
                            <strong className="figureNum"> $2.51 </strong>
                            <p className="figureName">EARNINGS PER USER</p>
                        </div>
                        <div className="figureSection">
                            <strong className="figureNum"> N/A </strong>
                            <p className="figureName">COVERSION RATE</p>
                        </div>
                    </div>
                    <div>
                        <img src={require('./img/graph-placeholder.jpg')} alt="Chart" className='chart' />
                        <div className="generate">
                            <div className="dates">
                                <span>Enter Start Date: </span>
                                <input/>
                            </div>
                            <div className="dates">
                                <span>Enter End Date: </span>
                                <input/>
                            </div>
                            <div className="buts">
                                <button className="dashButton btn btn-primary" onClick={this.RefreshAPI}> Refresh Data </button>
                                <button className="dashButton btn btn-primary"> Generate Report </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    async RefreshAPI() {
        await fetch('/api/SampleData/refreshApi?api=1')
            .then(response => response.json())
            .then(data => {
                this.setState({ Details: data, loading: false });
            });
    }
}
// DashboardMain can be accessed by URL https://localhost:44313/DashboardMain
