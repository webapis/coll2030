import { Typography } from '@mui/material'
import Bar from '../Bar'
import subcategoryPie from '../total-subcategory-pie.json'

const mapped = Object.entries (subcategoryPie).map(m=>{
    debugger
 const total  =Object.values( m[1]['data'])[0]
debugger
    return {date:m[0], total}
})
debugger
export default function SubcategoryPie(){
    return <div style={{marginTop:50}}>

        <Bar data={mapped}  label="products"/>
    </div>
}