import AddBoxIcon from '@mui/icons-material/AddBox';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';

function NewLoginBar(props) {
    const [tag, setTag] = useState('');
    const [inProgress, setInProgress] = useState(false);

    function onChange(event) {
        setTag(event.target.value);
    }

    async function onSubmit(event) {
        event.preventDefault();
        setInProgress(true);
        await props.onAdd(tag, () => { 
            setTag(''); 
            setInProgress(false);
        });
    }

    return (
        <Paper
          component="form"
          sx={{ display: 'flex', alignItems: 'center', width: '100%', borderStyle: 'solid' }}
          elevation={0}
          onSubmit={(e) => onSubmit(e)}
        >
            <InputBase
                sx={{ ml: 1, flex: 1}}
                placeholder="Please enter a name for your new login"
                value={tag} 
                onChange={onChange}
                onSubmit={(e) => onSubmit(e)}
            />
            {
                inProgress 
                ?
                   <Tooltip title='Confirm transaction' leaveDelay={5000}>
                        <IconButton>
                            <CircularProgress size='19px'/>
                        </IconButton>
                    </Tooltip>
                :
                    <Tooltip title='Add login'>
                        <IconButton type='submit' sx={{padding: 0}}>
                            <AddBoxIcon color='primary' fontSize='large'/>
                        </IconButton>
                    </Tooltip>
            }
        </Paper>
    );
}

export default NewLoginBar;