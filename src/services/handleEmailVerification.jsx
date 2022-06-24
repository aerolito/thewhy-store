import {getAuth, sendEmailVerification} from 'firebase/auth';
import {toast} from 'react-toastify';

export const handleEmailVerification = async (auth) => {
  return await sendEmailVerification(auth?.currentUser)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};
