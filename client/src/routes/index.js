import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import Dashboard from '../containers/Dashboard'
import {_404} from '../containers/error'
import Stories from '../containers/Stories'

export default (
    <div>
        <Switch>
            <Route path="/dashboard" component={Dashboard}/>
            <Redirect exact from="/" to="/dashboard"/>
            <Redirect exact from="/projects" to="/dashboard"/>
            <Route path="/projects/:projectId/stories" component={Stories}/>
            <Redirect from="/projects/:projectId" to="/projects/:projectId/stories"/>
            <Route component={_404}/>
        </Switch>
    </div>
);