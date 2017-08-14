import React from 'react'
import 'semantic-ui-label/label.min.css'
import { withRouter } from 'react-router-dom'

export default withRouter(({history, story, match}) => (
  <div key={story.id}>
    <h3>{story.name}</h3>
    <h4>Estimate: {story.estimate ? story.estimate : 'N/A'}</h4>
    <h4>State: {story.current_state}</h4>
    <h4>Type: {story.story_type}</h4>
    {story.labels.map(label => (
      <div key={label.id} className="ui label" onClick={ () => history.push(`/projects/${match.params.projectId}/stories/${label.id}`) }>
        {label.name}
      </div>
    ))}
  </div>
))