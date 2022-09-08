
import data from '../total-products.json'
import Bar from '../Bar'
export default function TotalCollected() {

    return <div style={{ width: 500 }}>
        <Bar data={data} />
    </div>
}