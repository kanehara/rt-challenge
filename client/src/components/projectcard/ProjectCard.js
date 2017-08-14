import React from 'react'
import './ProjectCard.css'
import { withRouter } from 'react-router-dom'

export default withRouter(({project, history}) => (
    <div className="project card" onClick={ () => history.push(`/projects/${project.id}/stories`) }>
        <h1>{project.name}</h1>
        <h3>{project.project_type}</h3>
        <h3>{project.iteration_length} week{project.iteration_length > 1 ? 's' : ''} / iteration</h3>
        <h3>Iteration: {project.current_iteration_number}</h3>
    </div>
))