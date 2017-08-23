import * as ActionTypes from '../actionTypes'

export const getProjects = payload => ({
    type: ActionTypes.GET_PROJECTS,
    payload,
});

export const getStories = payload => ({
  type: ActionTypes.GET_STORIES,
  payload
})

export const updateStory = payload => ({
  type: ActionTypes.UPDATE_STORY,
  payload
})