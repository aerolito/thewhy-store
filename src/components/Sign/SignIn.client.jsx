import {useState} from 'react';
import {useAtom} from 'jotai';
import {accessTokenAtom, userIdAtom} from '../../atoms/user';
import {handleSignin} from '../../services/handleSignin';
import {signStateAtom} from './atoms/sign-state';
import {isWishlistModalOpenAtom} from '../../atoms/is-wishlist-modal-open';
import {getAuth} from 'firebase/auth';
import {app} from '../../configs/firebase';
import {useNavigate} from '@shopify/hydrogen/client';

export default function SignIn() {
  const [, setIsWishlistModalOpen] = useAtom(isWishlistModalOpenAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setAccessToken] = useAtom(accessTokenAtom);
  const [, setUserId] = useAtom(userIdAtom);
  const [, setSignState] = useAtom(signStateAtom);
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth(app);
  const navigate = useNavigate();

  const onClickToSign = async () => {
    setIsLoading(true);
    const user = await handleSignin(auth, email, password);

    if (!user) return setIsLoading(false);

    setIsWishlistModalOpen(false);

    setAccessToken(user.token);
    setUserId(user.userId);

    setIsLoading(false);
    navigate('/', {replace: true});
  };

  return (
    <div className="translate-x-1/2 -translate-y-1/2 overflow-y-hidden overflow-x-hidden fixed right-[50vw] top-[50vh] z-50 rounded-lg shadow-md bg-white md:p-4 w-[80vw] max-w-[588px]">
      <div className="relative">
        <button
          onClick={() => setIsWishlistModalOpen(false)}
          type="button"
          className="absolute top-3 right-2.5 text-principal bg-transparent rounded-lg p-1.5 ml-auto inline-flex items-center"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div className="p-6 text-center flex flex-col gap-5">
        <span className=" text-text font-normal text-principal mb-5">
          LOGIN
        </span>
        <span className=" text-text font-normal text-principal">
          PREENCHA SEU E-MAIL E SENHA PARA REALIZAR O LOGIN
        </span>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          className="border border-black text-principal text-smallText rounded-full block w-full p-2.5"
          placeholder="Insira deu e-mail"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          className="border border-black text-principal text-smallText rounded-full block w-full p-2.5"
          placeholder="Insira sua senha"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button
          onClick={() => onClickToSign()}
          type="button"
          className={` ${
            isLoading && 'opacity-30 cursor-default'
          } border-2 m-auto mt-2 font-bold w-fit rounded-full text-[14px] border-black p-1.5 px-[30px] hover:opacity-80`}
        >
          {isLoading ? '...' : 'confirmar'}
        </button>

        <span className="cursor-pointer" onClick={() => setSignState('reset')}>
          Esqueci minha senha
        </span>

        <a className="cursor-pointer" href="/cadastro">
          Ainda não tem conta? cadastre-se aqui
        </a>
      </div>
    </div>
  );
}
