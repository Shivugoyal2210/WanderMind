import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  getFirestore,
  collection,
  where,
  getDocs,
  query,
  limit,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyASlo3c0cmGlFa2Amk443t1qJbc6rbgo_k',
  authDomain: 'blogweb-e9a2e.firebaseapp.com',
  projectId: 'blogweb-e9a2e',
  storageBucket: 'blogweb-e9a2e.appspot.com',
  messagingSenderId: '954254202371',
  appId: '1:954254202371:web:b79cbfa4eaf871179c2036',
  measurementId: 'G-341QBVWL9D',
};

function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

export async function getUserWithUsername(username) {
  const q = query(
    collection(firestore, 'users'),
    where('username', '==', username),
    limit(1)
  );
  const userDoc = (await getDocs(q)).docs[0];
  return userDoc;
}

export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}

export const STATE_CHANGED = 'state_changed';

const firebaseApp = createFirebaseApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();
export const firestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
