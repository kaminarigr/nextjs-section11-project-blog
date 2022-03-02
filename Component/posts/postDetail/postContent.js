import classes from './postContent.module.css';
import PostHeader from './postHeader';

// Με αυτή την βιβλιοθήκη μπορούμε να κάνουμε χρήση ιδικής γραφής
// για την αυτόματη μορφοποίηση του κειμένου.
import ReactMarkdown  from 'react-markdown';

export default function PostContent (props) {
    const {post} = props;
    
    const imagePath = `/images/posts/${post.slug}/${post.image}`;
    
    return (
        <article className={classes.content}>
            <PostHeader title={post.title} image={imagePath}/>
            <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
    )
}