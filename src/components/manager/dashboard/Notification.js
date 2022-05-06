import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

function Notification(props) {

    function reset() {
        props.reset(0);
    }

    let message, severity;
    switch(props.code) {
        case 0:
            break;
        case 1:
            message = "Login Added";
            severity = "success";
            break;
        case 2:
            message = "Password copied to clipboard";
            severity = "success";
            break;  
        case 3:
            message = "Password replaced";
            severity = "success";
            break;
        case 4:
            message = "Login deleted";
            severity = "success";
            break;
        case 5:
            message = "Address copied to clipboard";
            severity = "success";
            break;
        case 6:
            message = "Wallet connected";
            severity = "success";
            break;
        case 7:
            message = "Wallet disconnected";
            severity= "info";
            break;
        case 8:
            message = "Switched networks";
            severity = "info";
            break;
        case 9:
            message = "Message sent";
            severity = "success";
            break;
        case 10:
            message = "Message failed to send";
            severity = "error";
            break;
        case 11:
            message = "All fields required";
            severity = "error";
            break;
        case 12:
            message = "Aborted network switch";
            severity = "info";
            break;
        case 4001:
            message = "Transaction signature denied";
            severity = "info";
            break;
        case -32603:
            message = "Action requires 0.07 MATIC or 0.0015 AVAX";
            severity = "error";
            break;
        default:
            message = "Network Error: please retry";
            severity = "error";
    }

    return(
        <Snackbar 
            open={props.code !== 0} 
            autoHideDuration={5000}
            onClose={() => reset()}
        >
            <Alert 
                onClose={() => reset()} 
                severity={severity}
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}

export default Notification;