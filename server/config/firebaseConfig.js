// firebaseConfig.js
const admin = require('firebase-admin');
const serviceAccount = require('../chave-firebase.json');
require('dotenv').config();

// Inicializa o Firebase Admin SDK
const bucketName = process.env.storageBucket;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: bucketName,
});

const bucket = admin.storage().bucket();

module.exports = bucket;
