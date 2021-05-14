import { BACKEND_URL } from '../config';
import { User } from '../models/User.model';

const authHeader = { 'Authorization': 'Bearer ' + localStorage.getItem('token')}


export const getFriends = async () => {
  const response = await fetch(BACKEND_URL + "/friends", {
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')}
  });

  const data = await response.json();
  console.log(data)
  if (data) {
    return data;
  }

  return Promise.reject('Failed to get message from backend');
};

export const getFriendsOf = async () => {
  const response = await fetch(BACKEND_URL + "/friends_of", {
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')}
  });

  const data = await response.json();
  console.log(data)
  if (data) {
    return data;
  }

  return Promise.reject('Failed to get message from backend');
};


