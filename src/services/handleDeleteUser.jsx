import {deleteUser} from 'firebase/auth';
import {deleteDoc, doc} from 'firebase/firestore';
import {toast} from '../components/Toast.client';
import {database} from '../configs/firebase';

export default function handleDeleteUser(auth) {
  const user = auth.currentUser;

  deleteUser(user)
    .then(async () => {
      await deleteDoc(doc(database, 'users', user.uid));
      await deleteDoc(doc(database, 'newsletter-mailling', user.email));

      toast.success('Usuário deletado com sucesso!');
    })
    .catch((error) => {
      if (error.code === 'auth/requires-recent-login') {
        toast.error(
          'Sua conta está desatualizada. Por favor, faça login novamente.',
        );
        return;
      }

      toast.error('Desculpe, tivemos um problema ao deletar o usuário.');
    });
}
