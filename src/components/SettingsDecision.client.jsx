import {useAtom} from 'jotai';
import {handleSigout} from '../services/handleSignout';
import {
  accessTokenAtom,
  userDisplayNameAtom,
  userEmailAtom,
  userIdAtom,
} from '../atoms/user';
import {isSettingsModalOpenAtom} from '../atoms/is-settings-modal-open';
import {useNavigate} from '@shopify/hydrogen/client';
import {getAuth} from 'firebase/auth';
import {app} from '../configs/firebase';

export default function SettingsDecision() {
  const [, setIsSettingsModalOpen] = useAtom(isSettingsModalOpenAtom);
  const [, setAccessToken] = useAtom(accessTokenAtom);
  const [, setUserId] = useAtom(userIdAtom);
  const [, setUserDisplayName] = useAtom(userDisplayNameAtom);
  const [, setUserEmail] = useAtom(userEmailAtom);

  const auth = getAuth(app);
  const navigate = useNavigate();

  const onClickToLogout = async () => {
    const response = await handleSigout(auth);

    if (!response) return;

    setAccessToken('');
    setUserId('');
    setUserDisplayName('');
    setUserEmail('');

    setIsSettingsModalOpen(false);
    navigate('/', {replace: true});
  };

  return (
    <div
      className={`w-full max-w-7xl px-[1rem] md:px-8 lg:pb-0 mx-auto relative`}
    >
      <div className="translate-x-1/2 -translate-y-1/2 overflow-y-hidden overflow-x-hidden absolute right-[220px] top-[85px] z-50 rounded-lg shadow-[0_4px_15px_0px_rgba(0,0,0,0.15)] bg-white p-4 w-[80vw] h-[200px] max-w-[280px]">
        <div className="relative">
          <button
            onClick={() => setIsSettingsModalOpen(false)}
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
            onClick={onClickToLogout}
            className="border-2 w-fit rounded-full text-[14px] border-black p-1.5 px-[30px] font-bold"
          >
            SAIR
          </button>
          <div className="flex justify-center items-center  gap-5">
            <hr className="w-[98px] h-[1px]" />{' '}
            <span className="text-text text-principal">OU</span>{' '}
            <hr className="w-[98px] h-[1px]" />
          </div>
          <a
            href="/configuracoes"
            className="text-text text-principal font-bold underline decoration-solid cursor-pointer"
          >
            MINHA CONTA
          </a>
        </div>
      </div>
    </div>
  );
}
