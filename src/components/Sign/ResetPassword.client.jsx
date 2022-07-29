import {useState} from 'react';
import {useAtom} from 'jotai';
import {isWishlistModalOpenAtom} from '../../atoms/is-wishlist-modal-open';
import handleResetPassword from '../../services/handleResetPassword';
import {signStateAtom} from './atoms/sign-state';
import {getAuth} from 'firebase/auth';
import {app} from '../../configs/firebase';

export default function ResetPassword() {
  const [, setIsWishlistModalOpen] = useAtom(isWishlistModalOpenAtom);
  const [email, setEmail] = useState('');
  const [sended, setSended] = useState(false);
  const [, setSignState] = useAtom(signStateAtom);

  const auth = getAuth(app);

  const onClickReset = () => {
    const response = handleResetPassword(auth, email);

    if (!response) return;

    setSended(true);
  };

  return (
    <div className="translate-x-1/2 -translate-y-1/2 overflow-y-hidden overflow-x-hidden fixed right-[50vw] top-[50vh] z-50 rounded-lg shadow-md bg-white md:p-4 w-[80vw] max-w-[588px]">
      <div className="relative">
        <button
          onClick={() => {
            setIsWishlistModalOpen(false);
            setSignState('decision');
          }}
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-principal"
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
      {sended ? (
        <div className="p-6 text-center flex flex-col gap-5  h-[250px] justify-center">
          <span className=" text-text font-normal text-principal">
            CONTINUE O PROCESSO DE RESTAURAÇÃO DE SENHA PELO EMAIL ENVIADO PARA{' '}
            <span className="font-bold">{email}</span>.
          </span>
        </div>
      ) : (
        <div className="p-6 text-center flex flex-col gap-5">
          <span className=" text-text font-normal text-principal">
            PREENCHA SEU E-MAIL PARA RECEBER O LINK DE RESTAURAÇÃO DE SENHA
          </span>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            className="border border-black max-w-[400px] m-auto text-principal text-smallText rounded-full block w-full p-2.5"
            placeholder="Insira deu e-mail"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <button
            onClick={() => onClickReset()}
            type="button"
            className="border-2 m-auto mt-2 font-bold w-fit rounded-full text-[14px] border-black p-1.5 px-[30px] hover:opacity-80"
          >
            enviar email
          </button>
        </div>
      )}
    </div>
  );
}
