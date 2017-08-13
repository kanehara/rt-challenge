import React from 'react';
import { ConnectedRouter } from 'connected-react-router'
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import routes from './routes';

export default ({history}) => (
    <div className="App">
        <NavBar/>
        <ConnectedRouter history={history}>
            {routes}
        </ConnectedRouter>
        <Footer/>
    </div>
);

