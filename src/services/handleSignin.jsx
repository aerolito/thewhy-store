import {signInWithEmailAndPassword} from 'firebase/auth';
import {toast} from '../components/Toast.client';

export async function handleSignin(auth, email, password) {
  const response = signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const token = userCredential?.user?.accessToken;
      const userId = userCredential?.user?.uid;
      const userDisplayName = userCredential?.user?.displayName;
      const userEmail = userCredential?.user?.email;

      toast.success(`Login realizado com sucesso!`);

      return {token, userId, userDisplayName, userEmail};
    })
    .catch((error) => {
      const errorCode = error.code;

      if (errorCode === 'auth/user-not-found') {
        toast.error(`Usuário não encontrado.`);
        return;
      }
      if (errorCode === 'auth/wrong-password') {
        toast.error(`Senha incorreta.`);
        return;
      }
      if (errorCode === 'auth/invalid-email') {
        toast.error(`Email inválido.`);
        return;
      }
      toast.error('Desculpe, tivemos um problema no login.');
      return false;
    });

  return response;
}
