// Αυτο το αρχείο είναι προκειμενου να δώσουμε επιπλέον 
// παραμέτρους στην εφαρμογή μας. Ενώ μπορούμε να φτιάξουμε και
// κομάτια για να λειτουργείουν με την react portal.

// Αυτή η Head δεν είναι η ίδια με αυτήν για τα meta data.
import Document, {Html, Head, Main, NextScript} from "next/document";

class MyDocument extends Document{
    render() {
        return (
            // Έτσι δήνουμε πληροφοριές και στον πλοηγό για το τί
            // είδους στοιχεία έχουμε.
            <Html lang='en'>
                <Head/>
                <body>
                    <Main/>
                    <NextScript />
                    {/* Εδώ θα κάνουμε χρήση της portal που ουσιαστηκά
                    δεv έχει να κάνει με την εμφάνηση του αντηκειμένου
                    αλλά με το που θα εκτελείτε είναι σημαντικό να έχουμε
                    portals */}
                    <div id='notification'></div>
                </body>
            </Html>
        );
    }
}

export default MyDocument;