import Logo from './logo';
import Link from 'next/link';
import classes from './mainNavigation.module.css';

export default function MainNavigation () {
    return (
        <header className={classes.header}>
            {/* Όταν έχουμε ένα custom element θα πρέπει να 
            βάλουμε και την <a></a> για να καταλάβει τι θέλουμε
            να κάνουμε. Δεν χρειάζεται παραμετροποίηση. */}
            <Link href="/">
                <a>
                    <Logo />
                </a>
            </Link>
            <nav>
                <ul>
                    <li><Link href="/posts">Posts</Link></li>
                    <li><Link href="contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    )
}