import { BACKEND_URL } from '../config';
import { User } from '../models/User.model';

const authHeader = { 'Authorization': 'Bearer ' + localStorage.getItem('token')}


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

export const addFriend = async (userEmail: string) => {
    const response = await fetch(BACKEND_URL + '/friends/' + userEmail, {
        method: 'POST',
        headers: authHeader
    });

    if (response.status === 200) {
        return Promise.resolve("Friend added succesfully");
    }
    
    return Promise.reject(response.status);
}
