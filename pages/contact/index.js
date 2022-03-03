// meta data
import Head from 'next/head';
import { Fragment } from 'react/cjs/react.production.min';
import ContactForm from '../../Component/contact/contactForm';

export default function Contact () {
    return (
        <Fragment>
            <Head>
                <title>Contact me</title>
                <meta name='description' content='Send me your message'/>
            </Head>
            <ContactForm/>
        </Fragment>
        
    )
}