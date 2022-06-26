import {doc, setDoc} from 'firebase/firestore';
import {toast} from '../components/Popups/Toast.client';
import {database} from '../configs/firebase';

export const handleNewsletterMailling = async (email) => {
  try {
    if (!email) {
      toast.warning(`Você precisa digitar o seu email`);
      return false;
    }

    const newsletterMailling = doc(database, 'newsletter-mailling', email);

    const data = {
      date: new Date(),
    };

    await setDoc(newsletterMailling, data);

    return true;
  } catch (error) {
    toast.error(`Erro ao assinar a newsletter`);
    return false;
  }
};
