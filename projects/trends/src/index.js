import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Bar from './Bar';
import reportWebVitals from './reportWebVitals';
import data from './total-products.json'
import brendReport from './total-markas.json'

const root = ReactDOM.createRoot(document.getElementById('root'));

const mapBrendReport = Object.entries(brendReport).map(m => {
  const marka = m[0]
  const data = Object.values(m[1]).map((b) => {
    return Object.entries(b).map(l => { return { date: l[0], total: l[1] } })
  })[0]
  return { marka, data }
})
debugger
root.render(
  <React.StrictMode>
    <div style={{width:500}}>
    <Bar data={data}  />
    </div>
   
    {mapBrendReport.map((m,i)=>{
      const {marka,data}=m
      return <div  style={{width:500}}>
        {marka}
        <Bar data ={data} id={i}/>
      </div>
    })}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
