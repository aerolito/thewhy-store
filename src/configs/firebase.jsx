// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDwiMkjx626obIffY8OV7DcFkQgxsQagCI',
  authDomain: 'o-porque-netlify.firebaseapp.com',
  projectId: 'o-porque-netlify',
  storageBucket: 'o-porque-netlify.appspot.com',
  messagingSenderId: '459058884984',
  appId: '1:459058884984:web:471121ab1badaaeea9588d',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);

export const auth = getAuth(app);
