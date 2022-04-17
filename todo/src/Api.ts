import axios from "axios";

const instance = axios.create({
  baseURL: 'https://localhost:7026',
  timeout: 30000,
  headers: {'X-Custom-Header': 'foobar'}
});

export default instance;