import axios from "axios";
import { URLS } from "../config";

const instance = axios.create({
    baseURL: URLS.backend,
    timeout: 5000,
    // headers: {'Accept': 'application'}
});


export default instance;