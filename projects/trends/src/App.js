import { useRef,useEffect } from 'react';
import {  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle} from 'chart.js'

  import data from './total-products.json'
  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  );

function App() {
  const inputEl = useRef(null);

useEffect(()=>{
 
const myChart= new Chart(inputEl.current, {
    type: 'bar',
    data: {
        //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: data.map(d=>{return {x:d.date,y:d.total}}),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                // 'rgba(54, 162, 235, 0.2)',
                // 'rgba(255, 206, 86, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // 'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                // 'rgba(54, 162, 235, 1)',
                // 'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {

  maintainAspectRatio:true,
        scales: {
         
            y: {
                beginAtZero: true
            },
            
        },
        
    }
});
return ()=> {
  myChart.destroy();
}
},[])

  return (
    <div className="App" style={{width:500,height:200}}>
     App

     <canvas  ref={inputEl} id="myChart" width="400" height="400" ></canvas>
    </div>
  );
}

export default App;
