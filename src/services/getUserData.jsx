import {collection, getDocs, query, where} from 'firebase/firestore';
import {database} from '../configs/firebase';

export const getUserData = async (userId) => {
  const userDataQuery = query(
    collection(database, 'users'),
    where('uid', '==', userId),
  );

  const querySnapshot = await getDocs(userDataQuery);

  const userDoc = querySnapshot.forEach((snap) => {
    return snap.data();
  });

  return userDoc;
};
