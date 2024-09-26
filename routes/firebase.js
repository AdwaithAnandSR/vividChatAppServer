import express from 'express';
import admin from 'firebase-admin';
import { readFile } from 'fs/promises';
import path from 'path';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads' })

const serviceAccountPath = path.resolve('key/firebase_serviceKey.json');
const serviceAccount = JSON.parse(await readFile(serviceAccountPath, 'utf-8'));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'vividchatappdb.appspot.com'
});
const bucket = admin.storage().bucket();

import { uploadDp } from '../handlers/firebaseHandler.js';


router.post('/uploadDp', upload.single('image'),  async (req, res) => {
   uploadDp(req, res, bucket)
});


export default router