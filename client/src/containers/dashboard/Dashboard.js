import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'

import * as actions from '../../store/actions'
import ProjectCard from '../../components/ProjectCard'

const style = {
    projects: {
        margin: '50px'
    }
}

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
            <div className="grid three" style={style.projects}>
                { projects.map(project => (
                    <ProjectCard key={project.id} project={project}/>
                ))}
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
