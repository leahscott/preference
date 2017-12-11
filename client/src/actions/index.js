import axios from 'axios';
import Cookies from 'universal-cookie';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from './types';
import history from '../history';

const API_URL = '/api';
const CLIENT_ROOT_URL = 'localhost:3000';

const cookies = new Cookies();

export function errorHandler(dispatch, error, type) {
  let errorMessage = '';

  if (error.data.error) {
    errorMessage = error.data.error;
  } else if (error.data) {
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }

  if (error.status === 401) {
    dispatch({
      type: type,
      payload: 'You are not authorized to do this. Please login and try again.'
    });
    logoutUser();
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    });
  }
}

export function loginUser({ email, password }) {
  return function(dispatch) {
    axios
      .post(`${API_URL}/auth/login`, { email, password })
      .then(response => {
        cookies.set('token', response.data.token, { path: '/' });
        dispatch({ type: AUTH_USER });
        history.push('/');
      })
      .catch(error => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

export function registerUser({ email, firstName, lastName, password }) {
  return function(dispatch) {
    axios
      .post(`${API_URL}/auth/register`, {
        email,
        firstName,
        lastName,
        password
      })
      .then(response => {
        cookies.set('token', response.data.token, { path: '/' });
        dispatch({ type: AUTH_USER });
        history.push('/');
      })
      .catch(error => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

export function logoutUser() {
  return function(dispatch) {
    dispatch({ type: UNAUTH_USER });
    cookies.remove('token', { path: '/' });
    history.push('/login');
  };
}
