import { fireDb, getServerTimestampField } from './firebaseUtils'
import React, { useEffect, useState, useRef } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MessageIcon from '@material-ui/icons/Message';
import { useRerender } from '../hooks/useRerender'

export type ChatProps = {
  meId: string
  otherId: string
}

const LOAD_LIMIT = 7

export type Timestamp = {
  nanoseconds: number
  seconds: number
}

export type Message = {
  content: string
  timestamp: Timestamp
  from: string
}

export const Chat = ({ meId, otherId }: ChatProps) => {
  const rerender = useRerender()

  const [chatId, setChatId] = useState(meId < otherId ? `${meId}_${otherId}` : `${otherId}_${meId}`)

  // const [messages.current, setMessages] = useState<Message[]>([])
  const messages = useRef<Message[]>([])
  const [_, set_] = useState<any>({})
  const mostRecentMessage = useRef<Message>()
  const [oldestMessage, setOldestMessage] = useState<Message>()

  const startNewMessageListener = async () => {
    return fireDb
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .limit(1)
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length) {
          if (!mostRecentMessage.current || snapshot.docs[0].data().timestamp > mostRecentMessage.current.timestamp) {
            mostRecentMessage.current = snapshot.docs[0].data() as any
            console.log(mostRecentMessage.current)
            if (!mostRecentMessage.current) {
              return
            }
            messages.current = [mostRecentMessage.current, ...messages.current]
            rerender()
          }
        }
      })
  }

  const loadMoreMessages = async (firstTime: boolean = false): Promise<void> => {
    let chat = fireDb.collection('chats').doc(chatId)
    let fetchedMessages: any

    if (firstTime === true || !oldestMessage) {
      fetchedMessages = chat.collection('messages').orderBy('timestamp', 'desc').limit(LOAD_LIMIT)
    } else {
      fetchedMessages = chat.collection('messages').orderBy('timestamp', 'desc').startAfter(oldestMessage).limit(LOAD_LIMIT)
    }

    return fetchedMessages.get().then((snapshot: any) => {
      if (snapshot.docs.length) {
        setOldestMessage(snapshot.docs[snapshot.docs.length - 1])
        mostRecentMessage.current = snapshot.docs[0].data()

        let messageArray = snapshot.docs.map((doc: any) => {
          return {
            content: doc.data().content,
            timestamp: doc.data().timestamp,
            from: doc.data().from,
          }
        })

        console.log('fetched message array', messageArray)

        messages.current = [...messages.current, ...messageArray]
        rerender()
      }
    })
  }

  // create a new chat for two users if it doesn't exist;
  const createChat = async () => {
    let chat = fireDb.collection('chats').doc(chatId)

    return fireDb
      .runTransaction(async (transaction) => {
        return transaction.get(chat).then((data) => {
          if (data.exists) {
            console.log('chat already exists')
            return
          }

          let newChat = {
            user1Id: meId < otherId ? meId : otherId,
            user2Id: meId > otherId ? meId : otherId,
            createdAt: getServerTimestampField(),
          }

          chat.set(newChat, { merge: true })
        })
      })
      .then(() => {
        console.log('Transaction successfully committed!')
      })
      .catch((error) => {
        console.log('Transaction failed: ', error)
      })
  }

  // send message in chat
  const sendMessage = async (content: string) => {
    let chat = fireDb.collection('chats').doc(chatId)

    return fireDb
      .runTransaction(async (transaction) => {
        return transaction.get(chat).then((data) => {
          if (!data.exists) {
            console.log("Chat doesnt't exist!")
            return false
          }

          chat
            .collection('messages')
            .add({
              content: content,
              from: meId,
              timestamp: getServerTimestampField(),
            })
            .then(() => {
              console.log(`Added new message!`)
            })
        })
      })
      .then(() => {
        console.log('Transaction successfully committed!')
        return true
      })
      .catch((error) => {
        console.log('Error getting chat ', error)
        return false
      })
  }

  useEffect(() => {
    let listener: any

    createChat().then(() => {
      loadMoreMessages(true).then(() => {
        listener = startNewMessageListener()
      })
    })

    return () => {
      listener?.()
    }
  }, [])

  const [message, setMessage] = useState('')

  return (
    <div style={{display:'flex', flex: 1, flexDirection: 'column'}}>
      <div style={{display:'flex', flex: 1, flexDirection: 'column'}}>
      {messages.current.map((message) => {
        return (
        <div style={{width:'100%', display:'flex', justifyContent: message.from === meId ? 'flex-end' : 'flex-start'}}>{message.content}</div>
      )})}
      </div>

      <form onSubmit={async (event) => {
        event.preventDefault()
        try {
          await sendMessage(message)
          setMessage('')
        } catch (e) {
          console.error(e);
        }
      }}>
        <MessageIcon />
        <TextField id="message" placeholder="Type a message" value={message} onChange={(event) => setMessage(event.target.value)} />

        <Button type="submit">Send</Button>
      </form>
    </div>
  )
}
