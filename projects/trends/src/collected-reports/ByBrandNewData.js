import { Grid, Typography } from '@mui/material'
import Bar from '../Bar'
import brendReport from '../reports/updated/by-brand-newdata.json'
const mapBrendReport = Object.entries(brendReport).map(m => {
    const marka = m[0]
    const data = Object.values(m[1]).map((b) => {
        return Object.entries(b).map(l => { return { date: l[0], total: l[1] } })
    })[0]
    return { marka, data }
})
export default function ByBrandNewData() {

    return <Grid container style={{marginTop:50}}>{
        mapBrendReport.map((m, i) => {
            const { marka, data } = m
            return  <Grid item><Bar key={i} data={data} id={i}  label={marka.toUpperCase()}/></Grid> 
           
        })
        }</Grid>  
    
}