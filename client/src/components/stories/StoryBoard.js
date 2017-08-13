import React from 'react'

export const buildStoriesByStatus = stories => {
  return stories.reduce((built, story) => {
    if (built[story.current_state]) {
      built[story.current_state].push(story)
    }
    return built;
  }, {unscheduled: [], planned: [], unstarted: [], started: [], delivered: [], accepted: [], finished: [], rejected: []});
}

export default ({stories}) => {
  const storiesByStatus = buildStoriesByStatus(stories)

  return (
    <div className="grid 8">
      {stories.map(story => (
        <div key={story.id}>
          <h1>{story.name}</h1>
          <h4>Id: {story.id}</h4>
          <h4>Estimate: {story.estimate ? story.estimate : 'N/A'}</h4>
          <h4>State: {story.current_state}</h4>
          <h4>Type: {story.story_type}</h4>
        </div>
      ))}
      <div className="unscheduled">
      </div>
      <div className="unstarted">
      </div>
      <div className="started">
      </div>
      <div className="delivered">
      </div>
      <div className="accepted">
      </div>
      <div className="finished">
      </div>
    </div>
  )}