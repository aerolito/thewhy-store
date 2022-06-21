import {
  createUserWithEmailAndPassword,
  updateProfile,
  updateCurrentUser,
} from 'firebase/auth';
import {toast} from '../components/Toast.client';

export async function handleSignup(
  auth,
  email,
  password,
  displayName,
  cpf,
  phoneNumber,
) {
  const response = createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const token = userCredential?.user?.accessToken;
      const userId = userCredential?.user?.uid;

      return updateCurrentUser(auth.currentUser, {
        displayName,
        uid: cpf,
        phoneNumber,
      })
        .then(() => {
          toast.success(`Cadastro realizado com sucesso!`);

          return {token, userId, displayName, email};
        })
        .catch((err) => {
          toast.error(err);
          return;
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        toast.error(`Email já cadastrado.`);
        return;
      }
      if (errorCode === 'auth/invalid-email') {
        toast.error(`Email inválido.`);
        return;
      }
      if (errorCode === 'auth/weak-password') {
        toast.error(`Senha muito fraca.`);
        return;
      }
      toast.error('Desculpe, tivemos um problema no cadastro.');
      return false;
    });

  return response;
}
