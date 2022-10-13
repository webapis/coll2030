
import data from '../reports/updated/total-deleted.json'
import Bar from '../Bar'
export default function TotalDeleted(props) {


    return <div style={{ width: 500 }}>
        <Bar data={data} label="Total Deleted"/>
    </div>
}