import React from 'react'
import {connect} from 'react-redux'

import * as actions from '../../store/actions'
import Button from '../../components/Button'

const mapDispatchToProps = (dispatch) => ({
  updateStory: (payload) => dispatch(actions.updateStory(payload)),
})

/**
 * Returns an array of objects with two keys for the given story's current_state:
 *  label: the label of the button
 *  handler: the click handler of the action (i.e. dispatches updateStory)
 */
export const getLabelAndHandlers = ({story, updateStory, projectId }) => {
  const payload = {
    projectId,
    storyId: story.id
  }

  switch(story.current_state) {
    case 'rejected':
      return [{
        label: 'Restart',
        handler: () => updateStory({
          ...payload,
          requestBody: { current_state: 'started' }
        })
      }];
    case 'unstarted':
      return [{
        label: 'Start',
        handler: () => updateStory({
          ...payload,
          requestBody: { current_state: 'started' }
        })
      }];
    case 'started':
      return [{
        label: 'Finish',
        handler: () => updateStory({
          ...payload,
          requestBody: story.story_type === 'chore'
            ? { current_state: 'accepted' }
            : { current_state: 'finished' }
        })
      }]
    case 'finished':
      return [{
        label: 'Deliver',
        handler: () => updateStory({
          ...payload,
          requestBody: { current_state: 'delivered' }
        })
      }]
    case 'delivered':
      return [{
        label: 'Accept',
        handler: () => updateStory({
          ...payload,
          requestBody: { current_state: 'accepted' }
        })
      }, {
        label: 'Reject',
        handler: () => updateStory({
          ...payload,
          requestBody: { current_state: 'rejected' }
        })
      }]
    case 'accepted':
      return [{
        label: 'Reopen',
        handler: () => updateStory({
          ...payload,
          requestBody: { current_state: 'unstarted' }
        })
      }]
    default:
      return []
  }
}

export const UpdateStoryButton = ({story, projectId, updateStory}) => {
  const buttons = getLabelAndHandlers({story, updateStory, projectId})
    .map(l => (<Button key={l.label} clickHandler={l.handler}>{l.label}</Button>))
  return buttons.length ? (<div>{buttons}</div>) : null
}

export default connect(null, mapDispatchToProps)(UpdateStoryButton)

