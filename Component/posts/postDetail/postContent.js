import classes from './postContent.module.css';
import PostHeader from './postHeader';
import Image from 'next/image';
// Την κάναμε εισαγωγή σαν βιβλιοθήκη είναι για κάνουμε
// την παρουσίαση κωδικα πιο όμορφη.
// Κάνουμε τόσες εισαγωγές έτση ώστε να μην κάνουμε εισαγωγή όλου του
// πακέτου αλλά μόνο αυτών που είναι απαρέτητα.
import {PrismLight as SyntaxHighlighter} from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark'
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

// Με αυτή την βιβλιοθήκη μπορούμε να κάνουμε χρήση ιδικής γραφής
// για την αυτόματη μορφοποίηση του κειμένου.
import ReactMarkdown  from 'react-markdown';

// Για την εγραφή των γλωσσών που κάναμε εισαγωγή.
SyntaxHighlighter.registerLanguage('js',js);
SyntaxHighlighter.registerLanguage('css',css);

export default function PostContent (props) {
    const {post} = props;
    
    const imagePath = `/images/posts/${post.slug}/${post.image}`;
    
    // Γιανα έχουμε την τροποποίηση από την Next πάνω στιν εικόνες
    // Αυτά μας δύνωντε ως εργαλεία από την markdown.
    const customRenderers = {
        // img(image) {
        //     return <Image src={`/images/posts/${post.slug}/${image.src}`} alt={image.alt} width={600} height={300}/>
        // },
        // Για να μην βγάζει errors καθορίζουμε και τις παραγράφους
        p(paragraph){
            const {node} = paragraph;
            // Ελένχουμε αν είναι φώτο για να την τροποποιήσουμε αναλόγος
            if(node.children[0].tagName  === 'img') {
                const image = node.children[0];
                // Με αυτό τον τρόπο ακόμι και η φώτο είναι μέλος
                // των παραγράφων αλλά και πάλι μπορούμε να την
                // παραμετροποιήσουμε.
                return (<div className={classes.image}>
                    <Image src={`/images/posts/${post.slug}/${image.properties.src}`} alt={image.alt} width={500} height={300}/>
                </div>
                );
            }
            return <p>{paragraph.children}</p>
        },
        code(code){
            const { className, children } = code;
            // Για να πάρουμε την γλώσσα στην οποία γράφουμε.
            const language = className.split('-')[1]; // className is something like language-js => We need the "js" part here
            return <SyntaxHighlighter style={atomDark} language={language} children={children}/>
        }
    };

    return (
        <article className={classes.content}>
            <PostHeader title={post.title} image={imagePath}/>
            {/* Την components την βάλαμε για να καθορίσουμε
            τον τρόπο που θα κάνει render την εικόνα */}
             <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
        </article>
    )
}