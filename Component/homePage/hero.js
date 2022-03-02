// Για να κάνει βελτιστοποίηση σε μέγεθος και απετίσεις την εικώνα
import Image from 'next/image';

import classes from './hero.module.css';

export default function Hero () {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                {/* Επιδή η εικόνα είναι στον public που το περιεχόμενο του
                είναι αμεσα προσβάσημο από την root */}
                <Image src="/images/site/introPhoto.jpg" alt="An intro image" width={350} height={350} />
            </div>
            <h1>Hi...</h1>
            <p>Astrophotography blog under a light year far!</p>
        </section>
    )
}