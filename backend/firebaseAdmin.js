// /backend/firebaseAdmin.js

import admin from "firebase-admin";
import fs from "fs";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Get path to your service account JSON file
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

// Read and parse the service account file
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath));

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
