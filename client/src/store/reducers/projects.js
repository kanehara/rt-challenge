import * as actionTypes from '../actionTypes'

const initialState = { projects: [], status: 'initial' }

export const projects = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_PROJECTS:
            return {
                projects: [],
                status: 'loading'
            };
        case actionTypes.GET_PROJECTS_SUCCESS:
            return {
                projects: action.payload.projects,
                status: 'success'
            };
        case actionTypes.GET_PROJECTS_FAILURE:
            return {
                projects: [],
                status: 'failure'
            };
        default:
            return state;
    }
};