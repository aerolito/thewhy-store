import {sendPasswordResetEmail} from 'firebase/auth';
import {toast} from '../components/Popups/Toast.client';

export default function handleResetPassword(auth, email) {
  return sendPasswordResetEmail(auth, email)
    .then(() => {
      toast.success('Email enviado com sucesso!');
      return true;
    })
    .catch((error) => {
      toast.error('Desculpe, tivemos um problema no login.');
      return false;
    });
}
