const admin = require ('firebase-admin')
const serviceAccount = require('./serviceAccountKey')

// Inicializar Firebase Admin SDK
admin. initializeApp
({
    credential: admin.credential.cert(serviceAccount)
})

module.exports = admin