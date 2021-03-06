import React, { useEffect, useRef, useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import { FixedSizeList } from 'react-window'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'

import Friend from './Friend'
import FriendsHeader from './FriendsHeader'
import { useAppDispatch } from '../../redux'
import { setActiveChat } from '../../redux/features/chat'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
    },
    header: {
      paddingTop: '10px',
      paddingLeft: '10px',
    },
  }),
)

export default function FriendsList({ friends, setFriends }: any) {
  const classes = useStyles()
  const containerRef = useRef(document.createElement('div'))
  const [height, setHeight] = useState(0)
  const dispatch = useAppDispatch()
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  useEffect(() => {
    setHeight(containerRef.current.getBoundingClientRect().height - 40)
    // console.log(friends)
  }, [])

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root} ref={containerRef}>
      <Paper square={true} elevation={3}>
        <FriendsHeader setFriends={setFriends}></FriendsHeader>
        <Divider />
        <FixedSizeList height={height} width="100%" itemSize={70} itemCount={friends.length} itemData={friends}>
          {({ data, index, style }) => {
            // console.log(data, index)
            return (
              <ListItem button style={style} key={index} selected={selectedIndex == data[index].id}
                  onClick={(event) => {
                  handleListItemClick(event, data[index].id)
                  dispatch(setActiveChat(data[index].id))
              }}>
                <Friend
                  // firstName={data[index].firstName}
                  // lastName={data[index].lastName}
                  email={data[index].email}
                  friend_status={data[index].friend_status}
                  setFriends={setFriends}
                ></Friend>
              </ListItem>
            )
          }}
        </FixedSizeList>
      </Paper>
    </div>
  )
}
