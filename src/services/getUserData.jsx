import {doc, getDoc} from 'firebase/firestore';
import {database} from '../configs/firebase';

export const getUserData = async (userId) => {
  const docRef = doc(database, 'users', userId);

  const docSnap = await getDoc(docRef);

  if (!docSnap || !docSnap.data()) return false;

  return docSnap.data();
};
