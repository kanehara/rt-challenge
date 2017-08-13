import * as ActionTypes from '../actionTypes'

export const getProjects = payload => ({
    type: ActionTypes.GET_PROJECTS,
    payload,
});