// firebaseConfig.js
const admin = require('firebase-admin');
require('dotenv').config(); // Mantém para carregar o .env localmente

// --- INÍCIO DA MODIFICAÇÃO ---

// Pega o conteúdo da chave JSON da variável de ambiente.
const firebaseServiceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_JSON;

// Validação crucial: Verifica se a chave foi carregada.
if (!firebaseServiceAccountKey) {
  throw new Error('A variável de ambiente FIREBASE_SERVICE_ACCOUNT_KEY_JSON não foi definida. É necessária para a autenticação com o Firebase.');
}

// Converte a string JSON da variável de ambiente para um objeto JavaScript.
const serviceAccount = JSON.parse(firebaseServiceAccountKey);

// --- FIM DA MODIFICAÇÃO ---


// Esta parte permanece igual, pois já lê do ambiente.
const bucketName = process.env.storageBucket;

// Evita reinicializar o app se ele já estiver rodando (boa prática)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount), // Usa o objeto 'serviceAccount' criado acima
    storageBucket: bucketName,
  });
}

const bucket = admin.storage().bucket();

module.exports = bucket;
