import axios from 'axios';

const api = axios.create({
  baseURL: 'https://my-json-server.typicode.com/edilsonandrade/rn-rocketshoes-redux',
});

export default api;
