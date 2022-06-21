import {createUserWithEmailAndPassword} from 'firebase/auth';
import {toast} from './Toast.client';
import {doc, setDoc} from 'firebase/firestore';
import {database} from '../configs/firebase';

export default function handleWishlist() {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      const userId = user?.uid;
      const data = {
        [userId]: {
          name: 'Casaco',
          price: 25,
          image: 'USA',
        },
      };

      const newUserWishlist = doc(database, 'wishlist', user?.uid);
      await setDoc(newUserWishlist);

      toast.success(`Cadastro realizado com sucesso!`);
      return;
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        toast.error(`Email já cadastrado!`);
        return;
      }
      if (errorCode === 'auth/invalid-email') {
        toast.error(`Email inválido!`);
        return;
      }
      if (errorCode === 'auth/weak-password') {
        toast.error(`Senha muito fraca!`);
        return;
      }
      toast.error('Desculpe, tivemos um problema no cadastro');
      return;
    });
}
