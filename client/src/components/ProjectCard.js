import React from 'react'

export default ({project}) => (
    <div>
        <h1>{project.name}</h1>
        <h3>{project.project_type}</h3>
        <h3>{project.iteration_length} week{project.iteration_length > 1 ? 's' : ''}/iteration</h3>
        <h3>Iteration: {project.current_iteration_number}</h3>
    </div>
)