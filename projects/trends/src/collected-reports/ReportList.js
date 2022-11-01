import Bar from "../Bar";
import { AggregationContext } from "../AggregationRoute";
export default function ReportList(reportData) {


    return <AggregationContext.Consumer>{({ reportData, report }) => {

        return <div style={{width:600}}><Bar data={reportData} label={report} /></div>
    }}</AggregationContext.Consumer>

}