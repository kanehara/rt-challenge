import {Observable} from 'rxjs/Observable'
import * as ActionTypes from '../actionTypes';
import axios from './util/axiosClient';

export const getAllProjects = action$ => action$
    .ofType(ActionTypes.GET_PROJECTS)
    .switchMap(() => {
        return Observable.fromPromise(axios.get('/projects'))
                .map(res => res.data)
                .map(projects => ({
                    type: ActionTypes.GET_PROJECTS_SUCCESS,
                    payload: {projects},
                }))
                .catch(error => Observable.of({
                    type: ActionTypes.GET_PROJECTS_FAILURE,
                    payload: {error},
                }))
        }
    );