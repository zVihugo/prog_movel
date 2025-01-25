import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAfq0v5ONPCFbfQuuPPE382NsAID3i8bfI',
  authDomain: 'progmovel-shishido.firebaseapp.com',
  projectId: 'progmovel-shishido',
  storageBucket: 'progmovel-shishido.firebasestorage.app',
  messagingSenderId: '1064735688644',
  appId: '1:1064735688644:web:c5d69311aa31c7e016c691',
};

const app = initializeApp(firebaseConfig);

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

const auth_mod = getAuth(app);

export { auth_mod, app, db };
