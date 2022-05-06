import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TypeWriterEffect from 'react-typewriter-effect';

function About() {
    return (
        <Box>
            <Grid container direction='row' justifyContent='center' alignItems='center'>
                <Grid item>
                    <Typography variant='h4'>The decentralized p</Typography>
                </Grid>
                <Grid item>
                    <TypeWriterEffect
                        textStyle={{
                            fontFamily: 'Roboto, sans-serif',
                            color: '#000000',
                            fontWeight: 400,
                            fontSize: '2.125rem',
                            lineHeight: '1.235'
                        }}
                        startDelay={2000}
                        cursorColor="#000000"
                        multiText={[
                            'asswor',
                            '6'
                        ]}
                        multiTextDelay={3000}
                        multiTextLoop={true}
                        typeSpeed={200}
                    />
                </Grid>
                <Grid item>
                    <Typography variant='h4'>d manager</Typography>
                </Grid>
            </Grid>
            <Typography variant='subtitle1' gutterBottom>Secure. Private. Yours.</Typography>
            <div style={{textAlign: 'left'}}>
                <Typography variant='h5' gutterBottom>What is p6d?</Typography>
                <Typography variant='body1' gutterBottom paragraph>
                    p6d is a decentralized password manager. Existing manager applications either store your passwords locally on your device or remotely on a centralized, cloud-based server. p6d is unique because it doesn’t take either of these approaches: it never stores your passwords anywhere. Instead, it generates them on-demand using the built-in digital signature functionality of the user’s crypto wallet.
                </Typography>
                <Typography variant='h5' gutterBottom>What is a password manager, and why use one?</Typography>
                <Typography variant='body1' paragraph>
                    A password manager is an application that helps you generate and remember passwords. It solves two of the most common security vulnerabilities out there:
                </Typography>
                <Typography variant='body1' paragraph>
                    1. Human-generated passwords are often easy to guess, consisting of identifying information, like names and birthdays. Password managers can easily generate and store long, random strings of letters and numbers, which are infeasible for a hacker to recreate.
                </Typography>
                <Typography variant='body1' gutterBottom paragraph>
                    2. People often reuse passwords across many accounts or use only slight variations. This means that, if an attacker obtains the password to one of your accounts, they can more easily break into others. Password managers solve this by allowing you to make and securely store a unique password for every account.
                </Typography>
                <Typography variant='h5' gutterBottom>Why use p6d?</Typography>
                <Typography variant='body1' gutterBottom paragraph>
                    Password management is a challenge faced by every single user of the internet. Today, 60 million Americans use a password manager to secure their traditional web accounts. And, globally, there are 80 million crypto wallet users. Many users have both applications, maintaining two separate tools for centralized vs decentralized account verification. p6d combines them together, allowing you to use your crypto wallet as a password manager and improving the cost, convenience, and security of managing all of your accounts across the web.
                </Typography>
                <Typography variant='h5' gutterBottom>Why does decentralization matter?</Typography>
                <Typography variant='body1' gutterBottom paragraph>
                    Whether an existing password manager stores your data locally or in a cloud-based server, both are centralized. These systems can fail if you lose your device or if the server has an outage. They are also controlled by a single company, which means you can be denied products or services. And above all, they are inherently exploitative: the unspoken threat of a subscription model is that, if you stop paying, you lose access to your data. Decentralization addresses all of these shortcomings.
                </Typography>
                <Typography variant='h5' gutterBottom>What makes p6d decentralized?</Typography>
                <Typography variant='body1' gutterBottom paragraph>
                    For maximum security, p6d never stores your password anywhere. However, some metadata is required in order to fetch your logins and generate the passwords when you need them. MetaMask exposes an API to securely encrypt your metadata using your private key. This means that once it's encrypted, you are the only person in the world who can decrypt it (as long as you keep your private key secure, of course). 
                </Typography>
                <Typography variant='body1' gutterBottom paragraph>
                    The encrypted data is your vault, and p6d stores this encrypted vault data on the Interplanetary File System (IPFS), a decentralized network of servers around the world. Unlike a traditional manager, which can cut off access to your data if you don't pay your subscription fee, your vault is permanently accessible on IPFS, forever. Also, because p6d uses open APIs and standards to generate the vault, you can easily move to another service in the future or build your own personal manager. In this sense, p6d is the antithesis of every "walled garden" platform on web2.
                </Typography>
                <Typography variant='body1' gutterBottom paragraph>
                    Finally, in order to keep track of your vault, the IPFS address associated with it is stored on-chain. This data is transparently and permanently available.
                </Typography>
                <Typography variant='h5' gutterBottom>How do I use p6d?</Typography>
                <Typography variant='body1' gutterBottom paragraph>
                    To add a new login, head over to the Vault tab. Type a name for it into the main text field, and click the Add icon. This will generate a transaction to store the new login, which you can confirm in your MetaMask extension. After confirming, the new login will appear below the text field, at the top of your login list.
                </Typography>
                <Typography variant='body1' gutterBottom paragraph>
                    To get the password, click on the *** icon. This will send a request to MetaMask to generate a digital signature, which p6d uses to produce a password.
                </Typography>
                <Typography variant='body1' gutterBottom paragraph>
                    If you want to replace the password of an existing login, simply click the circular arrow icon on the login item. If you want to delete the login, click the trash can icon.
                </Typography>
                <Typography variant='h5' gutterBottom>Why are there fees, and how much are they?</Typography>
                <Typography variant='body1' gutterBottom paragraph>
                    Because the address of your IPFS vault is stored on-chain, a small and variable gas fee must be payed whenever it's updated. This compensates the miners who process the transactions and add blocks to the chain. By building p6d on Polygon and Avalanche networks, these fees are extremely low.
                </Typography>
                <Typography variant='body1' gutterBottom paragraph>
                    p6d adds a small service fee of approximately $0.10 onto the gas fee. This covers the costs of operating the application, such as the IPFS gateway used to publish and pin user vaults. It also funds new features and continued development.
                </Typography>
                <Typography variant='body1' gutterBottom paragraph>
                    On web2, most users are familiar with the ubiquitous "freemium" model. The basic version of an application is free to use and is funded through advertising and the collection / sale of user data. A more feature-rich application is available to users who pay a subscription fee. Ultimately, these applications make money by spying on users, restricting their access to better features, and holding their data hostage.
                </Typography>
                <Typography variant='body1' gutterBottom paragraph>
                    p6d believes in having a healthier relationship with customers. The micro-payment model ensures that:
                </Typography>
                <Typography variant='body1' gutterBottom paragraph>
                    • Customers only pay for what they use.
                </Typography>
                <Typography variant='body1' gutterBottom paragraph>
                    • Their data belongs to them forever.
                </Typography>
                <Typography variant='body1' gutterBottom paragraph>
                    • And p6d only profits if it's making something that customers continue to use.
                </Typography>
                <Typography variant='body1' gutterBottom paragraph>
                    If at any point, we fail in doing so, the switching costs are virtually nonexistant, since customers have total control over their data and can move to a new application with just a few clicks. To many, this will sound like a poor business strategy. We believe that doing the right thing by customers is never a bad decision.
                </Typography>
                <Typography variant='h5' gutterBottom>Additional questions or feedback</Typography>
                <Typography variant='body1' gutterBottom paragraph>
                    Please head over to the Contact page, and send us a note. Customer feedback is a driver of new features and changes. Please don't hesitate to share any thoughts. It is greatly appreciated, and we promise to respond as quickly as possible.
                </Typography>
            </div>
        </Box>
    );
}

export default About;