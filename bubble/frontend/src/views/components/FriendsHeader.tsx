import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Search from './Search'
import FriendButton from './FriendButton'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '53%',
            maxWidth: 300,
            backgroundColor: theme.palette.background.paper
        },
    }),
);

function FriendsHeader() {
    const classes = useStyles();

    return (
        <Paper className={classes.root} elevation={3}>
            <Search></Search>
            <FriendButton></FriendButton>
        </Paper>
    )
}

export default FriendsHeader
