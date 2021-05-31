import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Search from './Search'
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

function FriendsHeader({ friends, setFriends }: any) {
    const classes = useStyles();

    return (
        <>
            <div className={classes.buttonContainer}>
            <Search friends={friends}></Search>
                <AddButton setFriends={setFriends}></AddButton>
            </div>
        </>
    )
}

export default FriendsHeader
