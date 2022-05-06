// Material UI
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

// Custom styling
import 'styles/App.css';

function FAQ() {
    return(
        <div id='faq'>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography variant='h5' align='left' className='about'>What is this?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography variant='body1' align='left'>
                    Welcome to what may be your first glimpse of the future of authentication! If you've used one of the shiny, new decentralized apps (dapps) being built for Web3, then you've experienced the breathtaking ease of signing in with a single click through a Wallet application, like MetaMask. Hopefully, your favorite Web2 platforms like Amazon, Google, and Facebook will soon integrate these powerful tools into their login flows, giving customers the option to use them. Until then, this is a little tool that can help the spoiled Web3 users of the world get by in what is still a Web2 world. Long story short, this turns your web wallet into a password manager!
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <Typography variant='h5' align='left' className='about'>How does it work?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography variant='body1' align='left'>
                    I'm glad you're curious! Every wallet contains a secret key of 256 bits. This key is used by cryptographic hash functions to digitally sign pieces of data. Usually this is a transaction, but you can technically sign any arbitrary data! This means that if you and I each use our secret keys to sign the string "www.google.com", we will get outputs that follow a few very important properties: our outputs are guaranteed to be unique from anyone else's, they are deterministic (so no matter how many times we use them, the answer will always be the same), and they are practically impossible to guess. These sound like pretty good properties to have when generating a password!
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
                >
                <Typography variant='h5' align='left' className='about'>Ok but how do I use it?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography variant='body1' align='left'>
                    Paste the full URL of the website you're trying to log into. It doesn't matter whether you're creating a new password or regenerating an old one - the steps are the same. Click the button to get your password. This will prompt your Web3 browser wallet (e.g. MetaMask) for a signature. By signing, you are using your secret key to create the hash described above. We take a piece of this hash (the final 32 hexadecimal characters, or 128 bits) and convert them to a format called Base64. Simply click the copy button, and your password is on the clipboard!
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography variant='h5' align='left' className='about'>Is this secure?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant='body1' align='left'>
                        Yes, have no fear! Your secret key is 100% safe and never leaves your wallet or is exposed to anyone. The Ethereum network provides an RPC interface for signing the data, and it is bulletproof. And the password that is generated is safe, as well. It is not sent through any WebSockets or connections - all of the computation occurs on your device. Also, the password is never shown on the screen, since it is copied directly to your clipboard. 
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography variant='h5' align='left' className='about'>Why should I use this?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant='body1' align='left'>
                        Today, everyone's data is incredibly fragmented. From sticky notes on your desk to apps strewn across our devices, passwords and other login info are woefully disorganized and insecure. It would clearly be beneficial to bring all of this sensitive data into one system that is super secure, but no app or service today seems to rise to the challenge.

                        Enter Web3 wallets. These applications are being used today to secure billions of dollars in value. And Web3 users are familiar with the risks and responsibilities of maintaining their own cryptographic keys. Until Elon Musk is able to implant a password manager in your brain, this seems like the best basket to put our eggs in.

                        Also, Web3 is amazing, but it's not like Web2 is going to crumble tomorrow. We are going to keep using these legacy applications, and until then, it will be nice to bring along some of the comforts of home.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography variant='h5' align='left' className='about'>What's coming next?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant='body1' align='left'>
                        There are lots of features that can make this web app easier to use. Quick links to the most popular sites, the ability to overwrite old passwords, and options to customize the format of the passwords that are generated.

                        Beyond a web application, it will be a much smoother experience once the browser extension is complete. This will have autodetect and autofill features that make usage absolutely seamless - no extra tabs or clicks.

                        In the long-term, these features should be built into all wallet applications. Some are already doing so: for example, the Trezor hardware wallet offers password management capabilities. I am happy to work with web wallet owners on building out these features!
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default FAQ;