import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.31.98.104:3333',
});

export {api};