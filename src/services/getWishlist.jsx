import {doc, getDoc} from 'firebase/firestore';
import {database} from '../configs/firebase';

export const getWishlist = async (userId) => {
  const docRef = doc(database, 'wishlist', userId);

  const docSnap = await getDoc(docRef);

  if (!docSnap || !docSnap.data()) return false;

  return Object.values(docSnap.data());
};
