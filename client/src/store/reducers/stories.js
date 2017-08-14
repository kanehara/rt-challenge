import * as actionTypes from '../actionTypes'

const initialState = { stories: [], status: 'initial' }

export const stories = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GET_STORIES:
      return {
        stories: [],
        status: 'loading'
      };
    case actionTypes.GET_STORIES_SUCCESS:
      return {
        stories: action.payload.stories,
        status: 'success'
      };
    case actionTypes.GET_STORIES_FAILURE:
      return {
        stories: [],
        status: 'failure'
      };
    default:
      return state;
  }
};