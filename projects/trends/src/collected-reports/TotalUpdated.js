
import data from '../reports/updated/total-updated.json'
import Bar from '../Bar'
export default function TotalUpdated(props) {


    return <div style={{ width: 500 }}>
        <Bar data={data} label="Total Updated"/>
    </div>
}