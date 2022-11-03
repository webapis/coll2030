import { useRef, useEffect } from 'react';
import {
  Chart,
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
} from 'chart.js'


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

function Pie(props) {
  const inputEl = useRef(null);

  useEffect(() => {
const labels =props.data.map(d => { return d.title })
const data =props.data.map(d => { return d.count })
debugger
    const myChart = new Chart(inputEl.current, {
      type: 'pie',
data:{
        labels,
        datasets: [{
            label: `# of label`,
          data,
          backgroundColor: props.data.map((d, i) => {
           
              return `rgba(${generateRandomInteger(255)},${generateRandomInteger(255)}, ${generateRandomInteger(255)}, 0.2)`
            



          }),
          // borderColor: props.data.map((d, i) => {
          //   if (i === 0) {
          //     return 'rgba(54, 162, 235, 0.2)'
          //   }
          //   else {
          //     const prev = props.data[i - 1]
          //     if (prev.total > d.total) {
          //       return 'rgba(255, 0, 0, 0.2)'
          //     }
          //     else {
          //       return 'rgba(54, 162, 235, 0.2)'
          //     }
          //   }


          // }),
          // borderWidth: 1
        }]
      , hoverOffset: 4,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Pie Chart'
          }
        }
      },
    }});
    return () => {
      myChart.destroy();
    }
  }, [props])

  return <canvas ref={inputEl} id={props.id}  ></canvas>


}

export default Pie;


function generateRandomInteger(max) {
  return Math.floor(Math.random() * max);
}