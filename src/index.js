import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import GenderTab from './GenderTab'
import FilterResult from './FilterResult';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <GenderTab />
    <FilterResult />
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
