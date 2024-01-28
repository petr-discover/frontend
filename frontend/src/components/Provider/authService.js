import axios from 'axios';
import Cookie from 'js-cookie'

const API_URL = 'http://35.197.110.208:8080/api/v1/';

export function login(username, password) {
 return axios
   .post(API_URL + 'auth/login', {
     username,
     password
   }, { withCredentials: true })
   .then(response => {
    console.log(response.data);
     if (response.data) {
        Cookie.set("token", response.access_token);
        console.log(Cookie.get('token'));
     }

     return response;
   });
}

export function logout() {
    return axios
        .post(API_URL + 'auth/logout', {
        })
        .then(response => {
            Cookie.remove('token');
            console.log(response);
        })
}

export function register(email, username, password) {
 return axios.post(API_URL + 'auth/register', {
   email,
   username,
   password
 });
}

export function getUser(){
  return axios.get(API_URL + 'user')
  .then(response => {
    console.log(response);
  });
}
