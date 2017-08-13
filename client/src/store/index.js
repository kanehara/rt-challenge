import {createStore, applyMiddleware, compose} from 'redux'
import {createEpicMiddleware} from 'redux-observable'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import history from '../history'
import rootReducer from './rootReducer'
import rootEpic from './rootEpic'

const epicMiddleware = createEpicMiddleware(rootEpic)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = composeEnhancers(
    applyMiddleware(
        routerMiddleware(history),
        epicMiddleware
    )
);

// create store
const store = createStore(connectRouter(history)(rootReducer), middlewares);

export default store;
