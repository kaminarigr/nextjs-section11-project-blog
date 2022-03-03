// Για να επικοινωνίσουμε με την βάση δεδομένων.
import {MongoClient} from 'mongodb';

export default async function handler (req, res) {
    if(req.method === 'POST') {
        // Για να πάρουμε τα δεδομένα. 
        const {email, name, message } = req.body;
        // Έλενχος δεδομένων μιας ο έλενχος πρέπει να γήνετε στο back
        if(!email || !email.includes('@') || !name || name.trim() === '' || !message || message.trim() === '') {
            // H επιστροφή του σφάλματος στην περίπτωση που δεν πίραμε
            // σωστά δεδομένα.
            res.status(422).json({message: 'Invalid input.'});
            return
        }

        const newMessage = {
            email, name, message
        };

        let client;

        // Για να πάρουμε τις μεταβλητές περιβάλοντος.
        const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.3sdmd.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

        // Μια και μπορεί να αποτύχει.
        try {
            // Εφόσον έχουμε κλήση προς τον server θα πρέπει να διαχειρηστούμε
        // την υπόσχεση που μας επιστρέφει.
             client = await MongoClient.connect('mongodb+srv://kaminada:TestPass123@cluster0.3sdmd.mongodb.net/my-astrosite?retryWrites=true&w=majority');
        } catch (error) {
            // Για να πούμε ότι είχαμε κάποιο σφάλμα στην πλευρά του server.
            res.status(500).json({message: 'Could not connect to database.'});
            return;
        }
        // Για να μηλήσουμε με την βάση που έχουμε συνδεθεί
        // μέσα στις παρενθέσεις θα μπορούσαμε να βάλουμε μία άλλη 
        // βάση αν θέλαμε.
        const db = client.db();

        // Μιας και μπορεί να αποτύχει.
        try {
            // Το collection είναι από τξν mongodb και το όνομα είναι δικό μας
        // μέσα σε αυτό περνάμε το αντικείμενο που φτιάξαμε πιο πάνω με
        // τα στοιχεία που θέλαμε.
        const result = await db.collection('messages').insertOne(newMessage);
        // Για να φτιάχνει αυτόματα id για κάθε στοιχείο που αποθηκευει.
        newMessage.id = result.insertedId;
        } catch (error) {
            client.close();
            res.status(500).json({message: 'Storing message failed!'});
            return;
        }
        // Παντα να κλήνουμε την σύνδεση.
        client.close();
        res.status(201).json({message: 'Successfuly stored the message', message: newMessage})
    }
}