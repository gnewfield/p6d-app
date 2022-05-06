import About from 'components/pages/About';
import Feedback from 'components/pages/Feedback';
import Header from 'components/Header.js';
import Notification from 'components/manager/dashboard/Notification';
import PasswordManager from 'components/pages/PasswordManager.js';
import { connectors } from 'components/wallet/Connectors';
import { theme } from 'styles/Theme.js';
import { ThemeProvider } from '@emotion/react';
import { useWeb3React } from '@web3-react/core';
import { useState, useEffect, useRef } from 'react';
import 'styles/App.css';

function App() {
    const [page, setPage] = useState(1);
    const [connected, setConnected] = useState(false);
    const [notificationCode, setNotificationCode] = useState(0);
    const isMounted = useRef(false);

    const { active, activate } = useWeb3React();

    useEffect(() => {
        (async () => {
            // Check if provider is connected (i.e. user already approved site, otherwise no auto-connect)
            window.ethereum
                .request({ method: 'eth_accounts' })
                .then((accounts) => (async () => {
                    const provider = window.localStorage.getItem("provider");
                    if (provider && accounts.length) await activate(connectors[provider]);
                })())
                .catch(console.error);
        })();
    }, []);

    // Handles forceful disconnection from inside wallet
    useEffect(() => {
        if (isMounted.current && !active) {
            setConnected(false);
            setNotificationCode(7);
        } else {
            isMounted.current = true;
        }
    }, [active]);

    return(
        <ThemeProvider theme={theme}>
            <Header 
                page={page} 
                onPageChange={setPage}
                connected={connected}
                onConnect={() => { 
                    setConnected(true);
                    setNotificationCode(6);
                }}
                onDisconnect={() => {
                    setConnected(false);
                    setNotificationCode(7);
                }}
                emitNotification={(code) => setNotificationCode(code)}
            />
            <div style={{display: page === 0 ? null : 'none', maxWidth: '800px', margin:'20px auto', textAlign: 'center'}}>
                    {/* <FAQ/> */}
                    <About/>
            </div>
            <div className='page' style={{marginTop: '20px'}}>
                <div style={{display: page === 1 ? null : 'none', marginTop: '20px'}}>
                    <PasswordManager connected={connected} emitNotification={(code) => setNotificationCode(code)}/>
                </div>
                <div style={{display: page === 2 ? null : 'none'}}>
                    <Feedback emitNotification={(code) => setNotificationCode(code)}/>
                </div>
            </div>
            <Notification code={notificationCode} reset={() => setNotificationCode(0)}/>
        </ThemeProvider>     
    );
}

export default App;