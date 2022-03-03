// Για τα meta data
import Head from 'next/head';
import { Fragment } from "react";
import Hero from "../Component/homePage/hero";
import FeaturePosts from "../Component/homePage/featuredPosts";
import { getFeaturedPosts } from "../lib/postsUtilcomment";



export default function HomePage (props) {
    return (
        <Fragment>
            <Head>
                <title>YoruHikari</title>
                <meta name='description'
                content='Astrophotography photos and tricks'/>
            </Head>
            <Hero />
            <FeaturePosts posts={props.posts}/>
        </Fragment>
    )
}

// Σε αυτό θα πάρουμε πολύ εύκολα τα δεδομένα μιας και 
// η συνάρτηση που κάναμε φέρνει απευθείας όλα τα feature posts
export function getStaticProps() {
    const featuredPosts = getFeaturedPosts();
    // Πάντα έχουμε επιστροφή με αυτή την μορφή.
    return {
        props: {
            posts: featuredPosts
        },
        // Για να κάνει αναβάθμηση των αλλαγών εδώ είναι κάθε 60sec
        revalidate: 600
    }
}