import axios from 'axios';
// import FunctionService from '../tools/FunctionService';

const baseURL = 'https://ideo.id/api/v1';

const AXIOS = axios.create({
  baseURL
});

AXIOS.interceptors.response.use(function (response) {
  return response
}, function (error) {
  const snackbar = document.getElementById('snackbar-popup');
  snackbar.textContent = error.response.statusText;
  snackbar.className = "show";
  setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);

  return error
})

export default AXIOS;