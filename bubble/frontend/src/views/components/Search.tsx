import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FriendsListType from '../ChatView'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '90%',
            },
        },
    }),
);

interface FriendType {
    firstName: string,
    lastName: string,
    status: string
}

function Search({ friends }: FriendsListType) {
    const classes = useStyles();

    React.useEffect(() => {
        window.addEventListener('nv-enter', () => {
            let friendName = '';
            let input = document.getElementById('search-friend');
            if (input) {
                friendName = input.nodeValue!;
            }

            let filterFunction = (friend: FriendType) => {
                if (friendName === '') 
                    return true;
                if (friend['firstName'].toLowerCase().indexOf(friendName.toLowerCase()) !== -1)
                    return true;
                if (friend['lastName'].toLowerCase().indexOf(friendName.toLowerCase()) !== -1)
                    return true;
                return false;
            }

            // const newFriends = friends.filter(filterFunction);
            // setFriends(friends);
        })
    })

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField  fullWidth={true} id="search-friend" label="Find friend" />
        </form>
    );
}

export default Search
