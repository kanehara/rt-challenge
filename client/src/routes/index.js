import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import Dashboard from '../containers/Dashboard'
import {_404} from '../containers/error'
import Stories from '../containers/Stories'
import Banner from '../components/Banner';

export default (
    <div>
        <Banner/>
        <div className="innerApp">
            <Switch>
                <Route path="/dashboard" component={Dashboard}/>
                <Redirect exact from="/" to="/dashboard"/>
                <Redirect exact from="/projects" to="/dashboard"/>
                <Route path="/projects/:projectId/stories/:labelId" component={Stories}/>
                <Route path="/projects/:projectId/stories" component={Stories}/>
                <Route component={_404}/>
            </Switch>
        </div>
    </div>
);