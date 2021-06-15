import { fireDb, getServerTimestampField,
  timestampFromDate, getServerTimestamp } from './firebaseUtils'
import React, { useEffect, useState, useRef, useMemo } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useRerender } from '../hooks/useRerender'
import { makeStyles } from '@material-ui/core/styles'

export type ChatProps = {
  meId: string
  otherId: string
}

const LOAD_LIMIT = 100
const SECONDS_BUFFER: number = 5

export type Message = {
  content: string
  timestamp: any
  from: string
}

const useStyles = makeStyles((theme) => ({
  gradient: {
    background: `linear-gradient(148deg, rgba(255,116,224,1) 0%, rgba(168,107,255,1) 30%, rgba(134,216,255,1) 67%, rgba(161,255,188,1) 100%)`,
    filter: `progid:DXImageTransform.Microsoft.gradient(startColorstr="#020024",endColorstr="#3a3495",GradientType=1)`,
  }
}))

export const Chat = ({ meId, otherId }: ChatProps) => {
  const styles = useStyles()
  const rerender = useRerender()

  const chatId = useMemo(() => (meId < otherId ? `${meId}_${otherId}` : `${otherId}_${meId}`), [meId, otherId])

  const liveMessage = useRef<Message>()
  const messages = useRef<Message[]>([])
  const mostRecentMessage = useRef<Message>()
  const [oldestMessage, setOldestMessage] = useState<Message>()
  let interval: any

  const chatDiv = useRef(document.createElement("div"))

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
            if (!mostRecentMessage.current) {
              return
            }
            messages.current = [mostRecentMessage.current, ...messages.current]
            rerender()
            console.log(chatDiv)
            chatDiv.current.scrollTop = chatDiv.current.scrollHeight - chatDiv.current.clientHeight
          }
        } 
      })
  }

  const startLiveMessageListener = async () => {
    return fireDb
      .collection('chats')
      .doc(chatId)
      .onSnapshot((snapshot) => {
        if (!snapshot.data()) return
        let data = snapshot.data()?.[otherId]
        if (liveMessage.current != data) {
          liveMessage.current = data
          rerender()
          console.log(chatDiv)
          chatDiv.current.scrollTop = chatDiv.current.scrollHeight - chatDiv.current.clientHeight
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

    return fetchedMessages.get().then(async (snapshot: any) => {
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

        let chatt: any = await chat.get()
        messageArray = messageArray
          .filter((doc: any) => {
            console.log(chatt.data().deletedAt.toDate(), doc.timestamp.toDate(), doc.timestamp.toDate() < chatt.data().deletedAt.toDate())
            return doc.timestamp.toDate() > chatt.data().deletedAt.toDate()
          })

        messages.current = [...messages.current, ...messageArray]
        rerender()
        console.log(chatDiv)
        chatDiv.current.scrollTop = chatDiv.current.scrollHeight - chatDiv.current.clientHeight
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
            console.warn('chat already exists')
            return
          }

          let newChat = {
            meId: {
              timestamp: timestampFromDate(new Date(1999)),
              content: '',
            },
            otherId: {
              timestamp: timestampFromDate(new Date(1999)),
              content: '',
            },
            createdAt: getServerTimestampField(),
          }

          chat.set(newChat, { merge: true })
        })
      })
      .then(() => {
        // console.log('Transaction successfully committed!')
      })
      .catch((error) => {
        console.log('Transaction failed: ', error)
      })
  }

  // send message in chat
  const sendMessage = async (content: string) => {
    let chat = fireDb.collection('chats').doc(chatId)
    let newMessage = chat.collection('messages').doc()

    return fireDb
      .runTransaction(async (transaction) => {
        return transaction.get(chat).then((data) => {
          if (!data.exists) {
            console.warn("Chat doesnt't exist!")
            return false
          }

          transaction.update(chat, {
            [meId]: {
              timestamp: timestampFromDate(new Date(1999)),
              content: ''
            }
          })

          transaction.set(newMessage, {
            content: content,
            from: meId,
            timestamp: getServerTimestampField(),
          })
        })
      })
      .then(() => {
        // console.log('Sent new message')
        return true
      })
      .catch((error) => {
        console.error('Faild to send message', error)
        return false
      })
  }

  // update the live message of this user
  const updateLiveMessage = async(content: string) => {
    let chat = fireDb.collection('chats').doc(chatId)

    return chat
      .update({
        [meId]: {
          timestamp: getServerTimestampField(),
          content: content
        }
      })
      .then(() => {
        // console.log(`Live message update`)
      })
  }

  const newMessageListener = useRef<any>()
  const liveTypingListener = useRef<any>()

  const deleteChat = async() => {
    let chat = fireDb.collection('chats').doc(chatId)

    return chat
      .update({
        deletedAt: getServerTimestampField(),
      })
      .then(() => {
        messages.current = []
        rerender()
      })
  }

  useEffect(() => {
    // Reset everything when switching the chat from a user to another
    interval = setInterval(() => {
      rerender()
    }, 1000);

    setMessage('')
    messages.current = []
    mostRecentMessage.current = {
      from: '',
      content: '',
      timestamp: timestampFromDate(new Date(1999))
    }
    liveMessage.current = {
      from: otherId,
      content: '',
      timestamp: timestampFromDate(new Date(1999))
    }
    rerender()
    console.log(chatDiv)
    chatDiv.current.scrollTop = chatDiv.current.scrollHeight - chatDiv.current.clientHeight

    createChat().then(() => {
      loadMoreMessages(true).then(() => {
        Promise.all([
          startNewMessageListener(),
          startLiveMessageListener(),
        ]).then((values) => {
          newMessageListener.current = values[0]
          liveTypingListener.current = values[1]
        })
      })
    })

    return () => {
      newMessageListener.current?.()
      liveTypingListener.current?.()
      clearInterval(interval);
    }
  }, [meId, otherId])

  const [message, setMessage] = useState('')

  return (
    <div style={{display: 'flex', flex: 1, flexDirection: 'column', margin: '24px 40px' }}>
      <div ref={chatDiv} style={{height:'83vh', overflow:'scroll'}}>
      <div style={{  display: 'flex', flex: 1, flexDirection: 'column'}}>
        {messages.current
          .slice()
          .reverse()
          .map((message) => {
            const isMine = message.from === meId

            return (
              <div style={{ width: '100%', display: 'flex', justifyContent: isMine ? 'flex-end' : 'flex-start' }}>
                <div
                  style={{
                    padding: '8px 12px',
                    backgroundColor: isMine ? '#8ed4cb' : '#cccccc',
                    borderRadius: 999,
                    marginBottom: 16,
                  }}
                >
                  {message.content}
                </div>
              </div>
            )
          }
        )}
        {(() => {
          if (!liveMessage.current) return null
          let tsNow: Date = getServerTimestamp().toDate()
          let tsMess: Date = liveMessage.current?.timestamp.toDate()
          let passedSeconds = (tsNow.getTime() - tsMess.getTime()) / 1000
          if (passedSeconds < SECONDS_BUFFER) {
            return (
              <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  className={styles.gradient}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 999,
                    marginBottom: 16,
                  }}
                >
                  {liveMessage.current?.content}
                </div>
              </div>
            )
          }
          else {
            return null
          }
         })()
        }
      </div>
      </div>
      <form
        onSubmit={async (event) => {
          event.preventDefault()
          try {
            setMessage('')
            await sendMessage(message)
          } catch (e) {
            console.error(e)
          }
        }}
      >
        <div style={{ height:'5%', display: 'grid', gridTemplateColumns: '100px auto 100px' }}>
          <Button style={{ width: '100px' }} onClick={deleteChat}>Del</Button>
          <TextField
            id="message"
            variant="filled"
            placeholder="Type a message"
            value={message}
            onChange={async (event) => {
              let content = event.target.value
              setMessage(content);
              await updateLiveMessage(content)
            }}
            style={{ width: '100%' }}
          />

          <Button type="submit">Send</Button>
        </div>
      </form>
    </div>
  )
}
