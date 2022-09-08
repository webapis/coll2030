import { Typography } from '@mui/material'
import Bar from '../Bar'
import brendReport from '../total-markas.json'
const mapBrendReport = Object.entries(brendReport).map(m => {
    const marka = m[0]
    const data = Object.values(m[1]).map((b) => {
        return Object.entries(b).map(l => { return { date: l[0], total: l[1] } })
    })[0]
    return { marka, data }
})
export default function ByBrand() {

    return <div style={{marginTop:50}}>{
        mapBrendReport.map((m, i) => {
            const { marka, data } = m
            return <div style={{ width: 500 }}>
              <Typography variant='button'>  {marka}</Typography> 
                <Bar data={data} id={i} />
            </div>
        })
        }</div>  
    
}