// Το slug που βάλαμε σαν όνομα του ερχείου είναι έτση ώστε
// οι διευθήνσεις να έχουν μία μορφή πιο εύκολη προς αναγνώρηση
// και ανάγνωση σε σχέση με απλά την id.

import PostContent from "../../Component/posts/postDetail/postContent";
import { getPostData, getPostsFiler } from "../../lib/postsUtil";

export default function SinglePostPage (props) {
    return (
        <PostContent post={props.post}/>
    )
}
// Μιας και μέσο της context μπορούμε να έχουμε
// πρόσβαση στο params για να έχουμε την διεύθυνση
export function getStaticProps (context) {
    const {params} = context;
    const {slug } = params;

    const postData = getPostData(slug);

    return {
        props: {
            post: postData
        },
        revalidate: 600
    };
}

// Αυτό είναι απαρέτητο μιας και η static κανονικά δεν μπορεί να 
// μπει στην περιπτώσεις όπου έχουμε δυναμική διεύθυνση όπως [slug].
export function getStaticPaths() {
    // Η αν θέλουμε μπορούμε να έχουμε από πριν δυμιουργέισει τα 
    // paths μιας και δεν θα έχουμε πολλά post.
    // const postFilesnames = getPostsFiler();
    // Μια και τα ονόματα έρχοντε μαζί με την προέκταση.
    // const slugs = postFilesnames.map((fileName) => fileName.replace(/\.md$/, ''));
    // return {
    //     paths: slugs.map((slug) => ({params: {slug: slug}})),
    //     fallback: false
    // }


    return {
        paths: [],
        // Έτσι θα κάνει όλα τα paths όταν το επισκεπτούμε και όχι
        // πιο πριν. το blocking είναι για να περιμένουμε μέχρι
        // να είναι έτιμα.
        fallback: 'blocking'
    }
}