// meta data
import Head from 'next/head';
import { Fragment } from 'react/cjs/react.production.min';
import AllPosts from "../../Component/posts/allPosts";
import {getAllPosts} from '../../lib/postsUtil';


export default function AllPostPage (props) {
    return (
        <Fragment>
            <Head>
                <title>All Posts</title>
                <meta name='description'
                    content='A list of astrophotography.' />
            </Head>
            <AllPosts posts={props.posts}/>
        </Fragment>

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