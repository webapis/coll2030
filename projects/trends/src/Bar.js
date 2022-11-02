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

function Bar(props) {
  const inputEl = useRef(null);

useEffect(()=>{
 
const myChart= new Chart(inputEl.current, {
    type: props.chartType ? props.chartType: 'bar',
    data: {
        //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: `# of ${props.label}`,
            data: props.data.map(d=>{return {x:d.date,y:d.total}}),
            backgroundColor:props.data.map((d,i)=>{
              if(i===0){
                return  'rgba(54, 162, 235, 0.2)'
              }
              else{
                const prev =props.data[i-1]
                if(prev.total>d.total){
                  return 'rgba(255, 0, 0, 0.2)'
                }
                else if (prev.total<d.total){
                  return 'rgba(0, 128, 0, 0.2)'
                }
                else{
                  return 'rgba(54, 162, 235, 0.2)'
                }
              }
            
             
            }),
            borderColor:props.data.map((d,i)=>{
              if(i===0){
                return  'rgba(54, 162, 235, 0.2)'
              }
              else{
                const prev =props.data[i-1]
                if(prev.total>d.total){
                  return 'rgba(255, 0, 0, 0.2)'
                }
                else{
                  return 'rgba(54, 162, 235, 0.2)'
                }
              }
            
             
            }),
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
},[props])

  return <canvas  ref={inputEl} id={props.id}   height="200" ></canvas>
   
  
}

export default Bar;
