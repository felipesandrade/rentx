import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.31.99.153:3333',
});

export {api};