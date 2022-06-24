import {useAtom} from 'jotai';
import {signStateAtom} from './atoms/sign-state';
import {isWishlistModalOpenAtom} from '../../atoms/is-wishlist-modal-open';

export default function SignDecision() {
  const [, setIsWishlistModalOpen] = useAtom(isWishlistModalOpenAtom);
  const [, setSignState] = useAtom(signStateAtom);

  const onClickToSignin = () => {
    setSignState('signin');
  };

  return (
    <div className={`w-full px-[1rem] lg:pb-0 mx-auto relative`}>
      <div className="translate-x-1/2 -translate-y-1/2 overflow-y-hidden overflow-x-hidden absolute right-[160px] md:right-[200px] top-[85px] z-50 rounded-lg shadow-[0_4px_15px_0px_rgba(0,0,0,0.15)] bg-white p-4 w-[80vw] h-[200px] max-w-[280px]">
        <div className="relative">
          <button
            onClick={() => setIsWishlistModalOpen(false)}
            type="button"
            className="absolute top-0 right-0 bg-transparent p-1.5 ml-auto inline-flex items-center"
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
        <div className="p-6 text-center flex flex-col items-center gap-5">
          <button
            onClick={onClickToSignin}
            className="border-2 w-fit rounded-full text-[14px] border-black p-1.5 px-[30px] font-bold"
          >
            ENTRAR
          </button>
          <div className="flex justify-center items-center  gap-5">
            <hr className="w-[98px] h-[1px]" />{' '}
            <span className="text-text text-principal">OU</span>{' '}
            <hr className="w-[98px] h-[1px]" />
          </div>
          <a
            href="/cadastro"
            className="text-text text-principal font-bold underline decoration-solid cursor-pointer"
          >
            CADASTRAR AQUI
          </a>
        </div>
      </div>
    </div>
  );
}
