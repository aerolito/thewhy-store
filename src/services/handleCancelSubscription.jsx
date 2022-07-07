import {doc, deleteDoc} from 'firebase/firestore';
import {toast} from '../components/Popups/Toast.client';
import {database} from '../configs/firebase';

export const handleCancelSubscription = async (email) => {
  try {
    const newsletterMailling = doc(database, 'newsletter-mailling', email);

    await deleteDoc(newsletterMailling);

    return true;
  } catch (error) {
    toast.error(error);
    return false;
  }
};
