import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, HashRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import KeywordsRoute from './KeywordsRoute';
import AppBarComponent from './AppBarComponent';
import AggregationRoute from './AggregationRoute';
import Analitics from './access-reports/Analitics';
const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(



        <HashRouter >
                <Routes >
                        <Route path="/" element={<AppBarComponent />} />
                        <Route path="aggregation" element={<AggregationRoute />} />
                        <Route path="analitics" element={<Analitics />} />
                        <Route path="keywords/*" element={<KeywordsRoute />} />
                </Routes>
        </HashRouter>




);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
