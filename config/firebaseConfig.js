const admin = require('firebase-admin');
const serviceAccount = require('../internship-cb833-firebase-adminsdk-fslvx-0d512b319e.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'internship-cb833.appspot.com'
});

const bucket = admin.storage().bucket();

module.exports = { admin, bucket };
