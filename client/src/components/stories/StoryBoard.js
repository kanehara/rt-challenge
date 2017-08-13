import React from 'react'

export const buildStoriesByStatus = stories => {
  return stories.reduce((built, story) => {
    if (built[story.current_state]) {
      built[story.current_state].push(story)
    }
    return built;
  }, {unscheduled: [], planned: [], unstarted: [], started: [], finished: [], delivered: [], accepted: [], rejected: []});
}

/**
 * Concatenates all open tickets from the storiesByStatus map
 */
export const getOpenStories = ({unscheduled, planned, unstarted}) => [].concat(unstarted, planned, unscheduled)



export default ({stories}) => {
  const storiesByStatus = buildStoriesByStatus(stories)

  return (
    <div className="grid four">
      <h4>Open</h4>
      <h4>In Progress</h4>
      <h4>Acceptance</h4>
      <h4>Closed</h4>
      {stories.map(story => (
        <div key={story.id}>
          <h1>{story.name}</h1>
          <h4>Id: {story.id}</h4>
          <h4>Estimate: {story.estimate ? story.estimate : 'N/A'}</h4>
          <h4>State: {story.current_state}</h4>
          <h4>Type: {story.story_type}</h4>
        </div>
      ))}
      <div className="open">

      </div>
      <div className="inProgress">
      </div>
      <div className="acceptance">
      </div>
      <div className="closed">
      </div>
    </div>
  )}