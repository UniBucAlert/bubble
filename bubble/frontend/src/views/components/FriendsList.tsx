import React, { useEffect, useRef, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import Friend from './Friend'
import FriendsHeader from './FriendsHeader'
import { User } from '../../models/User.model';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
        },
    }),
);

function renderRow(props: ListChildComponentProps) {
    const { data, index, style } = props;
    console.log(data,index)
    return (
        <ListItem button style={style} key={index}>
            <Friend
                // firstName={data[index].firstName}
                // lastName={data[index].lastName}
                email = {data[index].email}
                status={data[index].status}
            ></Friend>
        </ListItem>
    );
}

export default function FriendsList({friends} : any) {
    const classes = useStyles();
    const containerRef = useRef(document.createElement("div"));
    const [height, setHeight] = useState(0);
    
    useEffect(() => {
            setHeight(containerRef.current.getBoundingClientRect().height - 120) 
            console.log(friends)
        },[])
    return (
        <div className={classes.root} ref={containerRef}>
            {/* {friends[0].email} */}
            <Paper square={true} elevation={3}>
            <FriendsHeader friends={friends}></FriendsHeader>
            <Divider />
            <Typography  color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
            <FixedSizeList height={height} width="100%" itemSize={70} itemCount={friends.length} itemData={friends}>
                {renderRow}
            </FixedSizeList>
            </Paper>
        </div>
    );
}
