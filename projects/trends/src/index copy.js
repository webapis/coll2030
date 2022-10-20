import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import Aggregation from './collected-reports/Aggregation';
import Analitics from './access-reports/Analitics';
import KeywordsRoutes from './keywords-editor/KeywordRoutes';
import store from './store/store'
import AppBarComponent from './AppBarComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(

  <React.StrictMode>


    <Provider store={store}>
      <BrowserRouter>
        <AppBarComponent />
        <Routes>
          <Route path="/" element={<AppBarComponent />} />
         
          <Route path="aggregation" element={<Aggregation />} />
          <Route path="analitics" element={<Analitics />} />
          <Route path="keywords/*" element={<KeywordsRoutes />} />
        </Routes>
      </BrowserRouter>
    </Provider>


  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
