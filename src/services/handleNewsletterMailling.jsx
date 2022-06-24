import {doc, setDoc} from 'firebase/firestore';
import {toast} from '../components/Toast.client';
import {database} from '../configs/firebase';

export const handleNewsletterMailling = async (email) => {
  try {
    if (!email) return toast.warning(`Você precisa digitar o seu email`);

    const newsletterMailling = doc(database, 'newsletter-mailling', email);

    const data = {
      date: new Date(),
    };

    await setDoc(newsletterMailling, data);
  } catch {
    return false;
  }
};
