import Bar from "../Bar";
import { AggregationContext } from "../AggregationRoute";
import { Grid } from '@mui/material';
export default function ReportList(reportData) {


    return <AggregationContext.Consumer>{({ reportData, report }) => {

        return <Grid container>{reportData.map(m=>{
            debugger
            return <Grid item>  <Bar data={m.data} label={m.title} /></Grid>
        })}
           </Grid>
    }}</AggregationContext.Consumer>

}