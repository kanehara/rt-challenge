import {Observable} from 'rxjs/Observable'
import * as ActionTypes from '../actionTypes';
import axios from './util/axiosClient';

export const getAllStories = action$ => action$
    .ofType(ActionTypes.GET_STORIES)
    .switchMap(({ payload: { projectId, labelId } }) => {
      if (labelId) {
          const stories$ = Observable.fromPromise(axios.get(`/projects/${projectId}/stories?label=${labelId}`))
              .map(res => res.data)
              .catch(error => Observable.of({
                  type: ActionTypes.GET_STORIES_FAILURE,
                  payload: {error}
              }))
          const label$ = Observable.fromPromise(axios.get(`/projects/${projectId}/labels/${labelId}`))
              .map(res => res.data.name)
              .catch(error => Observable.of({
                  type: ActionTypes.GET_LABEL_FAILURE,
                  payload: {error}
              }))
          return Observable.zip(
              stories$,
              label$,
              (stories, label) => ({
                 type: ActionTypes.GET_STORIES_SUCCESS,
                 payload: {stories, label}
              }))
      } else {
        return Observable.fromPromise(axios.get(`/projects/${projectId}/stories`))
            .map(res => res.data)
            .map(stories => ({
                type: ActionTypes.GET_STORIES_SUCCESS,
                payload: {stories}
            }))
            .catch(error => Observable.of({
                type: ActionTypes.GET_STORIES_FAILURE,
                payload: {error}
            }))
      }
    });

export const updateStory = action$ => action$
  .ofType(ActionTypes.UPDATE_STORY)
  .switchMap(({ payload: { projectId, storyId, requestBody } }) => {
    return Observable.fromPromise(axios.put(`/projects/${projectId}/stories/${storyId}`, requestBody))
      .map(res => res.data)
      .map(updatedStory => ({
        type: ActionTypes.UPDATE_STORY_SUCCESS,
        payload: {updatedStory}
      }))
      .catch(error => Observable.of({
        type: ActionTypes.UPDATE_STORY_FAILURE,
        payload: {error}
      }))
  });