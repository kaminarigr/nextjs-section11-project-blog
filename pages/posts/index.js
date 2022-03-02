import AllPosts from "../../Component/posts/allPosts";
import {getAllPosts} from '../../lib/postsUtil';


export default function AllPostPage (props) {
    return (
        <AllPosts posts={props.posts}/>
    )
}

export function getStaticProps () {
    const allPosts = getAllPosts();
    // Πάντα έχουμε επιστροφή με αυτή την μορφή.
    return {
        props: {
            posts: allPosts
        },
        // Για να κάνει αναβάθμηση των αλλαγών εδώ είναι κάθε 60sec
        revalidate: 600
    } 
}