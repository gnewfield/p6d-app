import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import PasswordIcon from '@mui/icons-material/Password';
import RefreshIcon from '@mui/icons-material/Refresh';
import { theme } from 'styles/Theme.js';
import { ThemeProvider } from '@emotion/react';
import { useState } from 'react';

function LoginList(props) {
    if (!props.logins.length) {
        return <Typography style={{marginTop: '10px'}}>You don't have any logins yet. Add one to get started!</Typography>
    }
    const loginList = 
        <ThemeProvider theme={theme}>
            <List sx={{bgcolor: 'background.paper'}}>
                {props.logins.map( login => (
                    <LoginListItem
                        key={login.id}
                        login={login} 
                        onGet={props.onGet}
                        onCopy={props.onCopy}
                        onUpdate={props.onUpdate} 
                        onDelete={props.onDelete}
                    />
                ))}
            </List>
        </ThemeProvider>;
    return loginList;
}

function LoginListItem(props) {
    return(
        <ListItem
            sx={{paddingTop: '5%', paddingBottom: '5%'}}
            secondaryAction={
                <LoginListItemActions 
                    login={props.login}
                    onGet={props.onGet}
                    onCopy={props.onCopy}
                    onUpdate={props.onUpdate} 
                    onDelete={props.onDelete}
                />
            }
        >
            <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#000000' }}>
                    <AccountBoxIcon color='secondary'/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={<Typography style={{color: 'black'}}>{props.login.tag}</Typography>}
                secondary={<Typography style={{color: 'black'}} variant='body2'>{(new Date(props.login.lastModifiedEpoch).toLocaleString()) + " (Version " + (props.login.version) + ")"}</Typography>}
            />
        </ListItem>
    );
}

function LoginListItemActions(props) {
    return(
        <div>
            {
                props.login.password
                ? 
                <Tooltip title='Copy'>
                    <IconButton onClick={() => props.onCopy(props.login)}>
                        <ContentCopyIcon color='primary'/>
                    </IconButton>
                </Tooltip>
                : 
                <Tooltip title='Get password'>
                    <IconButton onClick={() => props.onGet(props.login)}>
                        <PasswordIcon color='primary'/>
                    </IconButton>
                </Tooltip>
            }
            <ActionButton 
                tooltip='Replace password' 
                login={props.login} 
                action={props.onUpdate}
            >
                <RefreshIcon color='primary'/>
            </ActionButton>
            <ActionButton 
                tooltip='Delete password' 
                login={props.login} 
                action={props.onDelete}
            >
                <DeleteIcon color='primary'/>
            </ActionButton>
        </div>
    );
}

function ActionButton(props) {
    const [inProgress, setInProgress] = useState(false);

    let actionButton;
    let action = () => {
        setInProgress(true);
        props.action(props.login, () => setInProgress(false));
    }

    if (inProgress) {
        actionButton =
        <Tooltip title='Confirm transaction' leaveDelay={5000}>
            <IconButton>
                <CircularProgress size='24px'/>
            </IconButton>
        </Tooltip>
    } else {
        actionButton =
            <Tooltip title={props.tooltip}>
                <IconButton onClick={action}>
                    {props.children}
                </IconButton>
            </Tooltip>
    }
    return actionButton;
}

export default LoginList;