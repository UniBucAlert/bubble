import { BACKEND_URL } from '../config';
import { User } from '../models/User.model';

const authHeader = {
  'Authorization': 'Bearer ' + localStorage.getItem('token')
};

export const getFriendsList = async () => {
  const res = await fetch(BACKEND_URL + "/friends", {
    headers: authHeader
  })

  const data = await res.json()
  if (data) {
    return data;
  }

  return Promise.reject('Eroare');
}