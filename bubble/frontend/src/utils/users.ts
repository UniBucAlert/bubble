import { BACKEND_URL } from '../config';

export const getUser = async () => {

  const request = new Request(BACKEND_URL + '/users/me', {
    method: 'GET',
    headers: {
      "Authorization": "Bearer " + localStorage.getItem('token')
    },
  });

  const response = await fetch(request);

  if (response.status === 500) {
    throw new Error('Internal server error');
  }

  const data = await response.json();
  if (response.status > 400 && response.status < 500) {
    if (data.detail) {
      throw data.detail;
    }
    throw data;
  }

  console.log(data);
  return data;
};
