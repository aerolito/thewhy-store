import {
  createUserWithEmailAndPassword,
  updateProfile,
  updateCurrentUser,
} from 'firebase/auth';
import {toast} from '../components/Popups/Toast.client';
import {handleUserData} from './handleUserData';
import {handleEmailVerification} from './handleEmailVerification';
import {handleNewsletterMailling} from './handleNewsletterMailling';

export async function handleSignup(
  auth,
  email,
  password,
  displayName,
  cpf,
  phoneNumber,
  birthDate,
) {
  const response = createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const token = userCredential?.user?.accessToken;
      const userId = userCredential?.user?.uid;

      return await handleUserData({
        userId,
        displayName,
        email,
        cpf,
        phoneNumber,
        birthDate,
      })
        .then(async () => {
          await handleEmailVerification(auth);

          await handleNewsletterMailling(email);

          toast.success(
            `Cadastro realizado com sucesso! Email de verificação enviado.`,
          );

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
