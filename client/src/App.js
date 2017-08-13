import React from 'react';
import { ConnectedRouter } from 'connected-react-router'
import Footer from './components/Footer';
import routes from './routes';

export default ({history}) => (
    <div className="App">
        <ConnectedRouter history={history}>
            {routes}
        </ConnectedRouter>
        <Footer/>
    </div>
);

