import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? process.env.FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? process.env.FIREBASE_PROJECT_ID,
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? process.env.FIREBASE_APP_ID,
};

const requiredConfig = [
  ["FIREBASE_API_KEY", firebaseConfig.apiKey],
  ["FIREBASE_PROJECT_ID", firebaseConfig.projectId],
  ["FIREBASE_APP_ID", firebaseConfig.appId],
] as const;

function getMissingFirebaseVariables(): string[] {
  return requiredConfig
    .filter(([, value]) => !value)
    .map(([name]) => name);
}

export function getFirebaseApp(): FirebaseApp {
  const missingVariables = getMissingFirebaseVariables();

  if (missingVariables.length > 0) {
    throw new Error(
      `Firebase configuration is missing: ${missingVariables.join(", ")}`,
    );
  }

  return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
}

let db: Firestore | undefined;

export function getFirebaseDb(): Firestore {
  if (!db) {
    db = getFirestore(getFirebaseApp());

  }
  return db;
}
