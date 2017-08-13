import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'

import * as actions from '../store/actions'

const mapStateToProps = (state) => ({
    projects: state.projects.projects
})

const mapDispatchToProps = (dispatch) => ({
    getProjects: _.once(() => dispatch(actions.getProjects()))
})

export const Dashboard = ({ projects, getProjects }) => {
    getProjects();

    return (
        <div>
            <div>
                { projects.map(project => (
                    <h1 key={project.id}>{project.id}</h1>
                ))}
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
