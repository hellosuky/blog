import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/rootSaga.js'
import rootReducers from './reducers/rootReducers.js'
import {Provider} from 'react-redux'
import {compose,createStore,applyMiddleware} from 'redux'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

//init sagaMiddleware
const sagaMiddleware = createSagaMiddleware(rootSaga)

//init redux
const store = createStore(
  rootReducers,
  compose(applyMiddleware(sagaMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__?window.__REDUX_DEVTOOLS_EXTENSION__():f=>f))


sagaMiddleware.run(rootSaga)

ReactDOM.render(
<Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>
, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
