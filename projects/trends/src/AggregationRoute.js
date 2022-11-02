import React from 'react';

import AppBarComponent from './AppBarComponent';
import ReportSelector from './collected-reports/ReportSelector';
import ReportList from './collected-reports/ReportList';
export const AggregationContext = React.createContext();

const initState = {
    report: ''
}

export default class AggregationRoute extends React.Component {

    constructor(props) {
        super(props);

        this.setReport = async(e) => {
            const report =e.target.value
            debugger
            const response =await fetch(`/reports/${report}.json`)
            const reportData =await response.json()
            debugger
            this.setState(prevState => {
                return { ...prevState, report,reportData }
            })
        }
        this.state = {
            setReport: this.setReport,
            reportData:[]
        };
    }
    async componentDidMount() {


    }




    render() {
        return (
            <AggregationContext.Provider value={this.state}>
                <AppBarComponent />

                <div style={{ marginTop: 100 }}>
                    <ReportSelector />
                    <ReportList/>
                </div>

            </AggregationContext.Provider>

        );
    }
}