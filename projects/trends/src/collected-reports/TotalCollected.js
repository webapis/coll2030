
import data from '../reports/updated/total-collected.json'
import Bar from '../Bar'
export default function TotalCollected(props) {


    return <div style={{ width: 500 }}>
        <Bar data={data} label="Total Collected"/>
    </div>
}