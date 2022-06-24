import {collection, getDocs, query, where} from 'firebase/firestore';
import {database} from '../configs/firebase';

export const getUserData = async (userId) => {
  console.log('userId', userId);
  const userDataQuery = query(
    collection(database, 'users'),
    where('uid', '==', userId),
  );

  console.log('userDataQuery', userDataQuery);
  const querySnapshot = await getDocs(userDataQuery);

  console.log('querySnapshot', querySnapshot);

  const userDoc = querySnapshot.forEach((snap) => {
    return snap.data();
  });

  console.log('userDoc', userDoc);

  return userDoc;
};
