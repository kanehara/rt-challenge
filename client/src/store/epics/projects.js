import {Observable} from 'rxjs/Observable'
import * as ActionTypes from '../actionTypes';
import {signRequest} from './util/signRequest';
import {API_HOST} from '../../config';

export const getAllProjects = action$ => action$
    .ofType(ActionTypes.GET_PROJECTS)
    .map(signRequest)
    .switchMap(({headers}) => Observable
        .ajax.get(`${API_HOST}/projects`, headers)
        .map(res => res.response)
        .map(projects => ({
            type: ActionTypes.GET_PROJECTS_SUCCESS,
            payload: {projects},
        }))
        .catch(error => Observable.of({
            type: ActionTypes.GET_PROJECTS_FAILURE,
            payload: {error},
        }))
    );