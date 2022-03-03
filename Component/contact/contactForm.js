// Βάλαμε την useEffect για να κλήνει αυτόματα τα notification
import { useState, useEffect } from 'react';
import classes from './contactForm.module.css';
import Notification from '../ui/notification';

async function sendContactData (contactDetails) {
            // Για να στήλουμε τα δεδομένα. Βάλαμε καιτο method
        // στο body θα πάρουμε τα data.
        const responce = await fetch('/api/contact',{
            method: 'POST',
            body: JSON.stringify(contactDetails),
            // Για να πούμε στο back ότι στέλνουμε δεδομένα σε μορφή
            // json.
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await responce.json();

        if(!responce.ok){
            throw new Error(data.message || 'Something went wrong!');
        }
}

export default function ContactForm () {
    // Για να πάρουμε τα δεδομένα και να τα στήλουμε στο api
    // θα μπορούσαμε να είχαμε μία useState και να τα είχαμε όλα μαζι.
    const [enteredEmail, setenteredEmail] = useState('');
    const [enteredName, setenteredName] = useState('');
    const [enteredMessage, setenteredMessage] = useState('');
    const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
    // Για την περίπτωση του σφάλματος για να βγάλουμε το κατάληλο μήνημα
    // στο notification.
    const [requestError, setRequestError] = useState();

    // Για να σβήνουν τα notification μετά από 2sec.
    useEffect(()=>{
        if(requestStatus === 'success' || requestStatus === 'error'){
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setRequestError(null);
            },2000);
            // Για να κάνουμε καθαρισμό του μετρητή.
            return () => clearTimeout(timer);
        }
    },[requestStatus])

    async function sendMessageHandler(event) {
        // Για να το εμποδήσουμε να διαχειρηστεί το αίτημα μόνο του.
        event.preventDefault();

        // optional: add client-side validation

        // Εφόσον ήμαστε έδω έχουμε στήλει αίτημα για αποτελέσματα.
        setRequestStatus('pending')

        // Για να πιάσουμε κάπιο λάθος που μπορεί να βρεθεί
        try {
            await sendContactData({
                email: enteredEmail,
                name: enteredName,
                message: enteredMessage
            })

            // Για την επιτυχεία.
            setRequestStatus('success')
            // Εφόσον στήλαμε το περιεχόμενο μπορούμε να μηδενίσουμε
            // τα πεδία και αυτό θα γίνει μιας και έχουμε διπλής κατεύθυσνης
            // δέσημο.
            setenteredEmail('');
            setenteredName('');
            setenteredMessage('');
        } catch (error) {
            setRequestError(error.message);
            setRequestStatus('error');
        }
        
    }
    let notification;

    if(requestStatus === 'pending'){
        notification = {
            status: 'pending',
            title: 'Sending message...',
            message: 'Your message is on its way!'
        }
    }
    if(requestStatus === 'success'){
        notification = {
            status: 'success',
            title: 'Success!',
            message: 'Your message was saved!'
        }
    }

    if(requestStatus === 'error'){
        notification = {
            status: 'error',
            title: 'Error...',
            message: requestError
        }
    }

    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            <form className={classes.form} onSubmit={sendMessageHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor="email">Your Email</label>
                        {/* Με το onChange πέρνουμε την default event και περνάμε
                        τα δεδομένα μέσα στην state μας. */}
                        <input type='email' id='email' 
                            required value={enteredEmail}
                            onChange={event => setenteredEmail(event.target.value)}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="name">Your Name</label>
                        <input type='text' id='name' 
                            required value={enteredName}
                            onChange={event => setenteredName(event.target.value)}/>
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor='message'>Your message</label>
                    <textarea id='message' rows='5' 
                        value={enteredMessage}
                        onChange={event => setenteredMessage(event.target.value)}></textarea>
                </div>
                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>
            {notification && <Notification status = {notification.status} 
                title={notification.title}
                message={notification.message}/>} 
        </section>
    )
}