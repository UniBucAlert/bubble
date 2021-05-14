import { fireDb, getServerTimestampField } from './firebaseUtils';
import React, { Component } from 'react';


interface BareChatProps {
  meId: string,
  otherId: string,
}

export class BareChat extends Component<BareChatProps, any> {

  private readonly LOAD_LIMIT: number = 7;

  private meId: string;
  private otherId: string;
  private chatId: string;

  private oldestMessage: any;
  private mostRecentMessage: any;
  private listener: any;

  constructor(props: BareChatProps) {
    super(props);

    this.meId = props.meId;
    this.otherId = props.otherId;

    this.meId < this.otherId ? this.chatId = `${this.meId}_${this.otherId}` :
      this.chatId = `${this.otherId}_${this.meId}`;

    this.state = {
      messages: [],
    }

    this.createChat().then(() => {
      this.loadMoreMessages(true).then(() => {
        this.startNewMessageListener();
      });
    });
  }

  // TODO check auth

  async startNewMessageListener(): Promise<void> {
    this.listener = fireDb.collection('chats').doc(this.chatId)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .limit(1)
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length) {
          if (!this.mostRecentMessage ||
              snapshot.docs[0].data().timestamp >
              this.mostRecentMessage.timestamp) {

            this.mostRecentMessage = snapshot.docs[0].data();
            this.setState({
              messages: [this.mostRecentMessage, ...this.state.messages],
            });
            console.log(this.mostRecentMessage);
          }
        }
      });
  }

  async loadMoreMessages(firstTime: boolean = false): Promise<void> {
    let chat = fireDb.collection('chats').doc(this.chatId);
    let messages;

    if (firstTime === true || !this.oldestMessage) {
      messages = chat.collection('messages').
        orderBy('timestamp', 'desc').
        limit(this.LOAD_LIMIT);
    }
    else {
      messages = chat.collection('messages').
        orderBy('timestamp', 'desc').
        startAfter(this.oldestMessage).
        limit(this.LOAD_LIMIT);
    }

    return messages.get().then(snapshot => {
      this.oldestMessage = snapshot.docs[snapshot.docs.length - 1];
      this.mostRecentMessage = snapshot.docs[0].data();

      let messageArray = snapshot.docs.map((doc) => {
        return {
          content: doc.data().content,
          timestamp: doc.data().timestamp,
          from: doc.data().from,
        };
      });

      this.setState({
        messages: [...this.state.messages, ...messageArray],
      })
    });
  }

  // create a new chat for two users if it doesn't exist;
  async createChat(): Promise<void> {
    let  chat = fireDb.collection('chats').doc(this.chatId);

    return fireDb.runTransaction(async (transaction) => {
      return transaction.get(chat).then((data) => {
        if (data.exists) {
          console.log('chat already exists');
          return;
        }

        let newChat = {
          user1Id: this.meId < this.otherId ? this.meId : this.otherId,
          user2Id: this.meId > this.otherId ? this.meId : this.otherId,
          createdAt: getServerTimestampField(),
        };

        chat.set(newChat, { merge: true });
      });
    }).then(() => {
      console.log("Transaction successfully committed!");
    }).catch((error) => {
      console.log("Transaction failed: ", error);
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
          return false;
        }

        chat.collection('messages').add({
          content: content,
          from: userFromId,
          timestamp: getServerTimestampField(),
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
    this.listener();
  }

  render() {
    // To be overridden
    return (
      <div></div>
    );
  }
};
