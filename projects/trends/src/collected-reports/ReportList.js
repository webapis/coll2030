import Bar from "../Bar";
import Pie from '../Pie'
import { AggregationContext } from "../AggregationRoute";
import { Grid } from '@mui/material';
export default function ReportList(reportData) {


    return <AggregationContext.Consumer>{({ reportData, report }) => {
if(report && report.includes('-bar')){
    return <Grid container>{reportData.map(m=>{
        debugger
        return <Grid item>  <Bar data={m.data}  label={m.title}/></Grid>
    })}
       </Grid>
}else{
    return <Grid container>{reportData.map(m=>{
        debugger
        return <Grid item>  <Pie data={m.data} style={{width:300}}/></Grid>
    })}
       </Grid>
}
   
    }}</AggregationContext.Consumer>

}



/*
export default function ReportList(reportData) {


    return <AggregationContext.Consumer>{({ reportData, report }) => {

        return <Grid container>{reportData.map(m=>{
            debugger
            return <Grid item>  <Bar data={m.data} label={m.title} /></Grid>
        })}
           </Grid>
    }}</AggregationContext.Consumer>

}
*/