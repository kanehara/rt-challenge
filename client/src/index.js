import 'rxjs';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import './index.css';
import './style/grid.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import history from './history';

ReactDOM.render(
    <Provider store={store}>
        <App history={history} />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
