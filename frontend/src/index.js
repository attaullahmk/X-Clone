// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { Provider } from "react-redux";
// import store from './redux/store';
// import { PersistGate } from 'redux-persist/integration/react'
// import {persistStore} from "redux-persist";

// let persistor = persistStore(store);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//       <App />
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>
// );

//2
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from "redux-persist";
import axios from 'axios';

// Axios global configuration
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3080'; // Set your API base URL

// Debugging setup
if (process.env.NODE_ENV === 'development') {
  // Log Redux state changes
  store.subscribe(() => {
    // console.log('Redux State:', store.getState());
  });

  // Axios request/response logging
  axios.interceptors.request.use(request => {
    // console.log('Starting Request', request);
    return request;
  });

  axios.interceptors.response.use(response => {
    // console.log('Response:', response);
    return response;
  }, error => {
    console.error('Axios Error:', error);
    return Promise.reject(error);
  });
}

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);