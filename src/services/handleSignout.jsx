import {signOut} from 'firebase/auth';
import {toast} from '../components/Toast.client';

export async function handleSigout(auth) {
  const response = signOut(auth)
    .then(() => {
      toast.success(`Logout realizado com sucesso!`);
      return true;
    })
    .catch(() => {
      toast.error('Desculpe, tivemos um problema.');
      return false;
    });

  return response;
}
