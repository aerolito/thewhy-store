import {useNavigate} from '@shopify/hydrogen/client';
import {getAuth} from 'firebase/auth';
import {useAtom} from 'jotai';
import {useState, useEffect} from 'react';
import {isWishlistModalOpenAtom} from '../../atoms/is-wishlist-modal-open';
import {
  accessTokenAtom,
  userDisplayNameAtom,
  userEmailAtom,
  userIdAtom,
} from '../../atoms/user';
import {app} from '../../configs/firebase';
import {handleSignup} from '../../services/handleSignup';
import {toast} from '../Toast.client';

export default function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [, setAccessToken] = useAtom(accessTokenAtom);
  const [, setUserId] = useAtom(userIdAtom);
  const [, setIsWishlistModalOpen] = useAtom(isWishlistModalOpenAtom);
  const [, setUserDisplayName] = useAtom(userDisplayNameAtom);
  const [, setUserEmail] = useAtom(userEmailAtom);
  const [cpf, setCpf] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const auth = getAuth(app);
  const navigate = useNavigate();

  const onClickToSign = async () => {
    if (!name || !email || !password || !cpf || !phoneNumber) {
      return toast.error(`Nome, email e senha são obrigatórios`);
    }

    if (!termsAccepted) {
      return toast.error(`Aceitar os termos é obrigatório`);
    }

    const {
      token,
      userId,
      displayName: userDisplayName,
      email: userEmail,
    } = await handleSignup(auth, email, password, name, cpf, phoneNumber);

    if (!token || !userId) return;

    setAccessToken(token);
    setUserId(userId);
    setUserDisplayName(userDisplayName);
    setUserEmail(userEmail);

    navigate('/', {replace: true});
  };

  useEffect(() => {
    setIsWishlistModalOpen(false);
  }, []);

  return (
    <div className="text-center flex flex-col justify-center items-left">
      <div className="flex w-full justify-between">
        <div>
          <div className="flex flex-col gap-[1rem] text-left">
            <label className="text-principal font-bold text-text">
              NOME COMPLETO:
            </label>
            <input
              className="text-principal text-text border-black border-[1px] rounded-full mb-12 w-[350px] py-2 px-4"
              type="text"
              placeholder="Preencha com seu nome"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-[1rem] text-left">
            <label className="text-principal font-bold text-text">EMAIL:</label>

            <input
              className="text-principal text-text border-black border-[1px] rounded-full mb-12 w-[350px] py-2 px-4"
              type="email"
              placeholder="Preencha com seu email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-[1rem] text-left">
            <label className="text-principal font-bold text-text">
              CRIE SUA SENHA DE ACESSO:
            </label>

            <input
              className="text-principal text-text border-black border-[1px] rounded-full mb-12 max-w-[350px] py-2 px-4"
              type="password"
              placeholder="Preencha com sua senha"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-[1rem] text-left">
            <label className="text-principal font-bold text-text">CPF:</label>
            <input
              className="text-principal text-text border-black border-[1px] rounded-full mb-12 w-[350px] py-2 px-4"
              type="text"
              placeholder="Preencha com seu CPF"
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-[1rem] text-left">
            <label className="text-principal font-bold text-text">
              TELEFONE:
            </label>
            <input
              className="text-principal text-text border-black border-[1px] rounded-full mb-12 w-[350px] py-2 px-4"
              type="text"
              placeholder="Preencha com seu telefone"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-[0.75rem] items-center">
        <input
          type="checkbox"
          className="w-[18px] h-[18px] cursor-pointer"
          onChange={() => setTermsAccepted(!termsAccepted)}
        />
        <label className="text-principal text-text">
          Li e estou de acordo com os
          <a href="/termos" className="font-bold cursor-pointer">
            {' '}
            termos de uso
          </a>
        </label>
      </div>

      <button
        onClick={onClickToSign}
        className="px-8 py-2 m-auto my-20 text-white font-bold w-fit cursor-pointer bg-black rounded-[38px]"
      >
        feito!
      </button>
    </div>
  );
}
