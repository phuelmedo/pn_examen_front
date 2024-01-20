import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const reactDOM = () =>{
  ReactDOM.render(<App />, document.getElementById('root'))
}

if(window.cordova){
  document.addEventListener('deviceReady', () => {
    reactDOM()
  },false)
}else{
  reactDOM()
}

reportWebVitals();
