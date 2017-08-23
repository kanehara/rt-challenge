import React from 'react'
import './StoryBoard.css'
import StoryCard from './StoryCard'

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
 *
 * TODO: add ability to show non current iteration
 */
export const getOpenStories = ({unscheduled, planned, unstarted}) => [].concat(unstarted, planned, unscheduled)

/**
 * Concatenates all in progress tickets from the storiesByStatusMap
 */
export const getInProgressTickets = ({ started, rejected }) => [].concat(started, rejected)

export default ({stories}) => {
  const storiesByStatus = buildStoriesByStatus(stories)
  const inProgressStories = getInProgressTickets(storiesByStatus)
  const finishedStories = storiesByStatus.finished
  const inAcceptanceStories = storiesByStatus.delivered
  const closedStories = storiesByStatus.accepted

  const textAlignCenter = {
    textAlign: 'center'
  }

  return (
    <div className="grid four storyBoard">
      <h2 style={textAlignCenter}>In Progress</h2>
      <h2 style={textAlignCenter}>Finished</h2>
      <h2 style={textAlignCenter}>In Acceptance</h2>
      <h2 style={textAlignCenter}>Closed</h2>
      <div className="inProgress">
        {inProgressStories.map(story => (
            <StoryCard key={story.id} story={story} />
        ))}
      </div>
      <div className="finished">
        {finishedStories.map(story => (
            <StoryCard key={story.id} story={story} />
        ))}
      </div>
      <div className="inAcceptance">
        {inAcceptanceStories.map(story => (
            <StoryCard key={story.id} story={story} />
        ))}
      </div>
      <div className="closed">
        {closedStories.map(story => (
            <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  )}