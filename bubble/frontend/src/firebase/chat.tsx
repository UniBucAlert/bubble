import { fireDb, getFirestoreTimestamp } from './firebaseUtils';
import React, { Component } from 'react';


export class Chat extends Component {

  constructor(props: any) {
    super(props);
    this.state = {
      messages: [],
    }
  }

  // TODO init with limit
  // TODO listen for & load new messages
  // TODO how to load older 

  // create a new chat for two users if it doesn't exist;
  async createChat(user1Id: string, user2Id: string): Promise<string> {
    if (user1Id > user2Id) {
      [user1Id, user2Id] = [user2Id, user1Id];
    }
    let chatId = `${user1Id}_${user2Id}`;
    let  chat = fireDb.collection('chats').doc(chatId);

    return fireDb.runTransaction(async (transaction) => {
      return transaction.get(chat).then((data) => {
        if (data.exists) {
          console.log('chat already exists');
          return data.id;
        }

        let newChat = {
          user1Id: user1Id,
          user2Id: user2Id,
          createdAt: getFirestoreTimestamp(),
        };

        chat.set(newChat, { merge: true })
          .then(() => {
            return chatId;
          });
      });
    }).then(() => {
      console.log("Transaction successfully committed!");
      return chatId;
    }).catch((error) => {
      console.log("Transaction failed: ", error);
      return '';
    });
  }

  // send message in chat
  async sendMessage(chatId: string, userFromId: string,
                    content: string): Promise<boolean> {

    let chat = fireDb.collection('chats').doc(chatId);

    return fireDb.runTransaction(async (transaction) => {
      return transaction.get(chat).then((data) => {
        if (!data.exists) {
          console.log("Chat doesnt't exist!");
          return null;
        }

        chat.collection('messages').add({
          content: content,
          from: userFromId,
          timestamp: getFirestoreTimestamp(),
        }).then(() => {
          console.log(`Added new message!`);
        });
      });
    }).then(() => {
      console.log("Transaction successfully committed!");
      return true;
    }).catch((error) => {
      console.log("Error getting chat ", error);
      return false;
    });
  }


  // cleanup when unmounting from dom
  componentWillUnmount() {

  }

  render() {
    return (
      <div></div>
    );
  }
};
