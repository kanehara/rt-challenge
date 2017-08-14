import * as actionTypes from '../actionTypes'

const initialState = { stories: [], status: 'initial', label: null }

export const stories = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GET_STORIES:
      return {
        stories: [],
        status: 'loading',
        label: null
      };
    case actionTypes.GET_STORIES_SUCCESS:
      return {
        stories: action.payload.stories,
        status: 'success',
        label: action.payload.label
      };
    case actionTypes.GET_STORIES_FAILURE:
      return {
        stories: [],
        status: 'failure',
        label: null
      };
    default:
      return state;
  }
};