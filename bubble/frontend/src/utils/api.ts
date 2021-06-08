import { BACKEND_URL } from '../config';
import { User } from '../models/User.model';


export const getFriends = async () => {
  const response = await fetch(BACKEND_URL + "/friends", {
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
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
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
  });

  const data = await response.json();
  console.log(data)
  if (data) {
    return data;
  }

  return Promise.reject('Failed to get message from backend');
};


export const getContacts = async () => {
  // let i_friended = await getFriends()
  // let friended_me = await getFriendsOf()
  return Promise.all([getFriends(), getFriendsOf()]).then(([i_friended, friended_me]) => {


    let mutual_friends = i_friended.filter((a: any) =>
      friended_me.some((b: any) => a.id === b.id))
      .map((obj: any) => ({ ...obj, friend_status: "mutuals" }))

    let friend_requests = i_friended.filter((a: any) => !friended_me.some((b: any) => a.id === b.id))
    .map((obj: any) => ({ ...obj, friend_status: "i_friended" }))
      .concat(
        (friended_me.filter((a: any) => !i_friended.some((b: any) => a.id === b.id)))
        .map((obj: any) => ({ ...obj, friend_status: "friended_me" }))
        )


    let contacts = mutual_friends.map((obj: any) => ({ ...obj, friend_status: "mutuals" })).concat(friend_requests)

    return contacts;
  }).then((res) => { return res; })

  // console.log("i friended", i_friended)

  // console.log("friended me",friended_me)


};

export const addFriend = async (userEmail: string) => {
  const response = await fetch(BACKEND_URL + '/friends/' + userEmail, {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
  });

  if (response.status === 200) {
    return Promise.resolve("Friend added succesfully");
  }

  return Promise.reject(response.status);
}

export const removeFriend = async (userEmail: string) => {
    const response = await fetch(BACKEND_URL + '/friends/' + userEmail, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    });

    if (response.status === 200) {
        return Promise.resolve("Friend deleted succesfully");
    }

    return Promise.reject(response.status);
}
