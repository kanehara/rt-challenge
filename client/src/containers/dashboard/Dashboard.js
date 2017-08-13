import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'

import * as actions from '../../store/actions'

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
                    <div key={project.id}>
                        <h1>{project.name}</h1>
                        <h3>{project.project_type}</h3>
                        <h3>{project.iteration_length} week{project.iteration_length > 1 ? 's' : ''}/iteration</h3>
                        <h3>Iteration: {project.current_iteration_number}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
