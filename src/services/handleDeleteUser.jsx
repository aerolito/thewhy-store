import {deleteUser} from 'firebase/auth';
import {toast} from '../components/Toast.client';

export default function handleDeleteUser(auth) {
  const user = auth.currentUser;

  deleteUser(user)
    .then(() => {
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
