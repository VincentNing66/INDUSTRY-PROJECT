import React, { Component } from 'react';
import "./css/styles.css";

export class DashboardMain extends Component {

    render() {
        return (
            <div className="container justify-content-center col-md-12 center">
                <h1 className="center-text">Mattress Zone Summary Dashboard</h1>
                <form action="action_page.php" method="post">
                    <div >
                        <div className="figureSection">
                            <strong className="figureNum"> 246 </strong>
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
                            <strong className="figureNum"> $0.64 </strong>
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
                                <button className="dashButton btn btn-primary"> Refresh Data </button>
                                <button className="dashButton btn btn-primary"> Generate Report </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
// DashboardMain can be accessed by URL https://localhost:44313/DashboardMain
