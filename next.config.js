module.exports = {
    // Prefer loading of ES Modules over CommonJS
    experimental: { esmExternals: true },
    // Αυτό μας δίνει την ευκαιρία να έχουμε άλες συνδέσεις και
    // μεταβλητές κατα την κατασκευή του site και άλλες κατα
    // τελική του μορφή. 
    env: {
      mongodb_username: 'kaminada',
      mongodb_password: 'TestPass123',
      mognodb_clustername: 'cluster0',
      mongodb_database: 'my-astrosite'
    },
  };