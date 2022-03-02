import PostGrid from '../posts/postgrid';
import classes from './featurePosts.module.css';

export default function FeaturePosts (props) {
    return (
        <section className={classes.latest}>
            <h2>Featured Posts</h2>
            <PostGrid posts={props.posts}/>
        </section>
    )
}