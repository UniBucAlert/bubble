import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Search from './Search'
import FriendButton from './FriendButton'
import AddButton from './AddButton'
import FriendsListType from '../ChatView';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '130px',
            maxWidth: 300,
            backgroundColor: theme.palette.background.paper
        },
        buttonContainer: {
            display: 'flex',
        }
    }),
);

function FriendsHeader({ friends }: FriendsListType) {
    const classes = useStyles();

    return (
        <>
            <Search friends={friends}></Search>
            <div className={classes.buttonContainer}>
                <FriendButton></FriendButton>
                <AddButton></AddButton>
            </div>
        </>
    )
}

export default FriendsHeader
