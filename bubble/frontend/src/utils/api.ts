import { BACKEND_URL } from '../config';

const authHeader = { 'Authorization': 'Bearer ' + localStorage.getItem('token')}

export const getMessage = async () => {
  const response = await fetch(BACKEND_URL);

  const data = await response.json();

  if (data.message) {
    return data.message;
  }

  return Promise.reject('Failed to get message from backend');
};



export const getFriends = async () => {
  const response = await fetch(BACKEND_URL + "/friends", {
    headers: authHeader
  });

  const data = await response.json();
  console.log(data)
  if (data) {
    return data;
  }

  return Promise.reject('Failed to get message from backend');
};


