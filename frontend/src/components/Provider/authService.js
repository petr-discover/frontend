import axios from 'axios';
import Cookie from 'js-cookie'

const API_URL = 'http://35.197.110.208:8080/api/v1/auth/';

export function googleLogin() {
  return axios
  .get(API_URL + 'google/login')
  .then(response => {
    console.log(response);
    if (response.data.accessToken) {
      Cookie.set("token", response.data.access_token);
      console.log(Cookie.get('token'));
    }
    return response.data;
  });
}

export function login(username, password) {
 return axios
   .post(API_URL + 'login', {
     username,
     password
   })
   .then(response => {
    console.log(response.data);
     if (response.data) {
        Cookie.set("token", response.access_token);
        console.log(Cookie.get('token'));
     }

     return response.data;
   });
}

export function logout() {
    return axios
        .post(API_URL + 'logout', {
        })
        .then(response => {
            Cookie.remove('token');
            console.log(response);
        })
}

export function register(email, username, password) {
 return axios.post(API_URL + 'register', {
   email,
   username,
   password
 });
}

export function getCurrentUser() {
 return JSON.parse(localStorage.getItem('user'));
}
