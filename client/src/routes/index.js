import React from 'react'
import { Route, Switch } from 'react-router'
import Home from '../components/Home'
import _404 from '../components/_404'

export default (
    <div>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route component={_404}/>
        </Switch>
    </div>
);