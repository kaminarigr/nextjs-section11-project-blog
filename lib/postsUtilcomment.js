// Το βοηθητηκό αυτό component είναι για να πέρνουμε δεδομένα
// από τον server και τα metadata.


// Για να έχουμε πρόσβαση στο file system μιας και θα δούμε
// πόσα αρχεία έχουμε για να εμφανίουμε τα στοιχεία τους.
import fs from 'fs';

// Βιβλιοθήκη που βάλαμε και μας επιτρέπει να πάρουμε το
// περιεχόμενο και τα meta data από markdown αρχείο.
import matter from 'gray-matter';


// Για να έχουμε πρόσβαση στο δέντρο του site μας.
import path from 'path';
// Το process.cwd() είναι για να πάμε στον root
const postsDirectory = path.join(process.cwd(), 'posts');

// Μας δείνει όλα τα αρχεία που έχουμε στον φάκελο.
export function getPostsFiler () {
    return fs.readdirSync(postsDirectory);
}


// Με την χρήση του ${postSlug}.md και της αφέρεσεις της 
// προέκτασης πλέον μπορούμε να καλέσουμε χωρής να είναι απαρέτητα
// το όνομα με την προέκταση.
export function getPostData (postIdentifier) {
    // Έτσι αφερούμε την προέκταση από το όνομα.
    // ΕΧΟΥΜΕ ΦΡΟΝΤΙΣΕΙ ΝΑ ΕΙΝΑΙ ΜΕ ΤΟΝ ΤΡΟΠΟ ΠΟΥ ΠΡΕΠΕΙ!!!
    const postSlug = postIdentifier.replace(/\.md$/, ''); 

    // Για να παρουμε ένα απόλιτο μονοπάτι για το αρχείο.
    const filePath = path.join(postsDirectory, `${postSlug}.md`);
    // Για να πάρουμε τα δεδομένα από το αρχείο, βέβαια αυτά
    // θέλουν διαχωρισμό σε κείμενα και meta. To utf-8 το
    // βάλαμε για να βοηθήσουμε την εμφάνηση του κειμένου.
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    // Κάνοντας χρήση της matter πέρνουμε δύο παράγωντες
    // τα data που έχουν και τα meta και την content που έχει
    // το περιεχόμενο του αρχείου.
    const {data, content} = matter(fileContent);


    // Εδώ πλέον πέρνουμε τα δεδομένα με την μορφή που είναι πλέον
    // εύκολη η επεξεργασία.
    const postData = {
        slug: postSlug,
        ...data,
        content
    };
    return postData;
}

export function getAllPosts () {
    // Από αυτό πέρνουμε ένα πίνακα με τα αρχεία που είναι
    // σε αυτό το φάκελο.
    const postFiles = getPostsFiler();

    // Πέρνουμε ένα πίνακα μέ όλα τα στοιχεία που θέλουμε
    // με την μορφή που τα θέλουμε.
    const allPosts = postFiles.map(postFile => {
        return getPostData(postFile);
    })
    // Είναι απο την js η διαδικασία ταξηνόμησης
    const sortedPosts = allPosts.sort((postA,postB) => postA.date > postB.date? -1 : 1);

    return sortedPosts;
}

export function getFeaturedPosts () {
    // Αφου το έχουμε έτιμο πιο πάνω το μόνο που θέλουμε
    // είναι να φιλτράρουμε τα αποτελέσματα.
    const allPosts = getAllPosts();
    const featuredPosts = allPosts.filter(post => post.isFeatured);
    
    return featuredPosts;
}