import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore} from 'redux';

//reducer: actualizan el estado de la app
const store= createStore ((state = 0, action)=>{
  
  //console.log('State y get action',{state, action})
  switch(action.type){
    case 'incrementar':{
      return state+1
    }
    case 'decrementar':{
      return state-1
    }

    case 'set':{
      return action.payload
    }
    default: 
      return state

  }

})

console.log('State de store objtect:',{store})
//cada vez que se ejecuta dispatch ejecuta el reducer 
store.dispatch({type: 'lala'})
console.log (store.getState())


store.dispatch({type: 'incrementar'})
console.log (store.getState())
store.dispatch({type: 'decrementar'})
console.log (store.getState())
store.dispatch({type: 'set', payload: 54})
console.log (store.getState())
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
