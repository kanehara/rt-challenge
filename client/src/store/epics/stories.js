import {Observable} from 'rxjs/Observable'
import * as ActionTypes from '../actionTypes';
import axios from './util/axiosClient';

export const getAllStories = action$ => action$
    .ofType(ActionTypes.GET_STORIES)
    .switchMap(({ payload: { projectId, labelId } }) => {
      const url = labelId
          ? `/projects/${projectId}/stories/${labelId}`
          : `/projects/${projectId}/stories`
      return Observable.fromPromise(axios.get(url))
          .map(res => res.data)
          .map(stories => ({
            type: ActionTypes.GET_STORIES_SUCCESS,
            payload: {stories},
          }))
          .catch(error => Observable.of({
            type: ActionTypes.GET_STORIES_FAILURE,
            payload: {error},
          }))
    });