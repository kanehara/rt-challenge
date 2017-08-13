import React from 'react'
import { Route, Switch } from 'react-router'
import Dashboard from '../containers/Dashboard'
import _404 from '../containers/_404'

export default (
    <div>
        <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route component={_404}/>
        </Switch>
    </div>
);