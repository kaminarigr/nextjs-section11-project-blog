import classes from './postItem.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function PostItem (props) {
    // Περιμένουμε ένα props που έχει το post που περιέχει πολλάπλα
    // πεδία πληροφοριών.
    const { title, image, excerpt, date, slug } = props.post;

    // Για να κάνουμε την ημερωμηνία εύκολα αναγνώσημη.
    const formattedDate = new Date(date).toLocaleDateString('en-Us',{
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // Στην image πέρουμε το όνομα του αρχείου κάτι το οποίο
    // δεν είναι αρκετό. Όποτε βάλαμε την διαδρομή η οποία θα
    // καθορίζεται δυναμικά με φάκελο και όνομα αρχείου.
    const imagePath = `/images/posts/${slug}/${image}`;

    const linkPath = `/posts/${slug}`;


    return (
        <li className={classes.post}>
            <Link href={linkPath}>
                <a>
                    <div className={classes.image}>
                        {/* Με το responcive η φωτογραφίες τροποποιούντε ανάλογα
                        με τον χώρο που τους δήνετε */}
                        <Image src={imagePath} alt={title} width={300} height={200} layout="responsive"/>
                    </div>
                    <div className={classes.content}>
                        <h3>{title}</h3>
                        <time>{formattedDate}</time>
                        <p>{excerpt}</p>
                    </div>
                </a>
            </Link>
        </li>
    )
}