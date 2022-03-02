import classes from './postHeader.module.css';
import Image from 'next/image';

export default function PostHeader (props) {
    const {title , image} = props;
    return (
        <header className={classes.header}>
            <h1>{title}</h1>
            {/* Σε αυτήν την περίπτωση έχουμε από την props 
            απευθείας όλι την διαδρομί της εικόνας. */}
            <Image src={image} alt={title} width={200} height={100}/>
        </header>
    )
}