import classes from './postgrid.module.css';
import PostItem from './postItem';

export default function PostGrid (props) {
    const {posts} = props;
    return (
        <ul className={classes.grid}>
            {posts.map(post => <PostItem key={post.slug} post={post}/>)}
        </ul>
    )
}