import axios from 'axios'
import {API_HOST, AUTH_TOKEN} from '../../../config';

export default axios.create({
    baseURL: API_HOST,
    headers: {
        'Authorization': `Basic ${AUTH_TOKEN}`,
    }
});


