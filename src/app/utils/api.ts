import axios from 'axios';
import {environment} from "../../environment/environment";

const api = axios.create({baseURL: environment.apiBaseUrl, withCredentials: true});

export default api;
