import axios from 'axios';

const baseDomain = "../";
const baseURL = `${baseDomain}`; 

export default axios.create({
   baseURL
   ,headers: {'Content-Type': 'multipart/form-data'}
});