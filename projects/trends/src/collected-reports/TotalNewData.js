
import data from '../reports/updated/total-newdata.json'
import Bar from '../Bar'
export default function TotalNewData(props) {

debugger
    return <div style={{ width: 500 }}>
        <Bar data={data} label="Total NewData"/>
    </div>
}