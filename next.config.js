// Αν και φένεται περίεργο είναι μία import απλά της
// nodejs.
// Με αυτό το τρόπο μπορούμε να εισάγουμε τις διάφορες
// φάσεις που μπορέι να βρήσκετε το πρόγραμμα μας και να πέρνουμε
// τα αντίστοιχα δεδομένα για την σύνδεση.
const {PHASE_DEVELOPMENT_SERVER} = require('next/constants');

// Το κάναμε από αντικείμενο συνάρτηση έτση ώστε να μπορουμε
// να έχουμε ελένχους.
module.exports = (phase) => {
    if(phase === PHASE_DEVELOPMENT_SERVER) {
      return {
        // Αυτό μας δίνει την ευκαιρία να έχουμε άλες συνδέσεις και
        // μεταβλητές κατα την κατασκευή του site και άλλες κατα
        // τελική του μορφή. 
        env: {
          mongodb_username: 'kaminada',
          mongodb_password: 'TestPass123',
          mognodb_clustername: 'cluster0',
          mongodb_database: 'my-astrosite-dev'
        }
      }
    }
    return {
      env: {
        mongodb_username: 'kaminada',
        mongodb_password: 'TestPass123',
        mognodb_clustername: 'cluster0',
        mongodb_database: 'my-astrosite'
      }
    } 
  };