import React, { useState, useRef } from 'react'
import emailjs from 'emailjs-com'
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import CustomButton from 'components/general/CustomButton';
import ReCAPTCHA from 'react-google-recaptcha';

const Feedback = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const recaptchaRef = useRef(null);

    const submit = async () => {
        if (name && email && message) {
            const serviceId = 'service_yd18ki4';
            const templateId = 'template_5o3mxag';
            const userId = 'swxvpkN-du1TlyvkO';

            const captchaToken = await recaptchaRef.current.executeAsync();
            const templateParams = {
                name,
                email,
                message,
                'g-recaptcha-response': captchaToken
            };

            emailjs.send(serviceId, templateId, templateParams, userId)
                .then(response => {
                    console.log(response);
                    props.emitNotification(9);
                })
                .catch(error => {
                    console.log(error);
                    props.emitNotification(10);
                });
            console.log("Sent email...");
            recaptchaRef.current.reset();

            setName('');
            setEmail('');
            setMessage('');
        } else {
            props.emitNotification(11);
        }
    }

    const style = { 
        flex: 1, 
        borderStyle: 'solid',
        borderRadius: 5,
        width: '100%',
        height: '100%',
        padding: '5px'
    };

    return (
        <form onSubmit={submit}>
            <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={"6LeyBYIfAAAAAFFqnsghnz_x7_5hhy83dkFgIae2"}
                size="invisible"
            />
            <Grid container direction='column' justifyContent='center' alignItems='stretch' spacing={1}>
                <Grid container item direction='row' justifyContent='space-between' alignItems='center' spacing={1}>
                    <Grid item xs={6}>
                        <InputBase
                            xs={6}
                            style={style}
                            placeholder="Your name"
                            value={name} 
                            onChange={e => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputBase
                            style={style}
                            placeholder="Your email address"
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid item>
                    <InputBase
                        style={style}
                        multiline={true}
                        fullWidth={true}
                        placeholder="Please share questions, comments, or feedback of any kind"
                        rows={5}
                        value={message} 
                        onChange={e => setMessage(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <CustomButton style={style} onClick={submit}>
                        Send Message
                    </CustomButton>
                </Grid>
            </Grid>
        </form>
    );
};

export default Feedback;