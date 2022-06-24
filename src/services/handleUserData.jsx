import {doc, getDoc, setDoc} from 'firebase/firestore';
import {database} from '../configs/firebase';

export async function handleUserData({
  userId,
  displayName,
  email,
  cpf,
  phoneNumber,
  birthDate,
}) {
  await setDoc(doc(database, 'users', userId), {
    displayName,
    email,
    cpf,
    phoneNumber,
    birthDate,
  });

  return true;
}
