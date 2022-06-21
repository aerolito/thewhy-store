import {useNavigate} from '@shopify/hydrogen/client';
import {getAuth} from 'firebase/auth';
import {useAtom} from 'jotai';
import {useEffect} from 'react';
import {isSettingsModalOpenAtom} from '../atoms/is-settings-modal-open';
import {isWishlistModalOpenAtom} from '../atoms/is-wishlist-modal-open';
import {
  accessTokenAtom,
  userDisplayNameAtom,
  userEmailAtom,
  userIdAtom,
} from '../atoms/user';
import {app} from '../configs/firebase';
import handleDeleteUser from '../services/handleDeleteUser';
import {handleSigout} from '../services/handleSignout';

export default function SettingsForm() {
  const [, setIsWishlistModalOpen] = useAtom(isWishlistModalOpenAtom);
  const [, setIsSettingsModalOpen] = useAtom(isSettingsModalOpenAtom);
  const [, setAccessToken] = useAtom(accessTokenAtom);
  const [, setUserId] = useAtom(userIdAtom);
  const [userDisplayName, setUserDisplayName] = useAtom(userDisplayNameAtom);
  const [userEmail, setUserEmail] = useAtom(userEmailAtom);

  const auth = getAuth(app);
  const navigate = useNavigate();

  useEffect(() => {
    setIsWishlistModalOpen(false);
    setIsSettingsModalOpen(false);

    const user = auth.currentUser;

    if (user) {
      console.log(user.phoneNumber);
      console.log(user.uid);
    }
  }, []);

  const onClickToDelete = async () => {
    handleDeleteUser(auth);
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
    <div className="text-center flex flex-col justify-center items-left gap-10">
      <div className="flex w-full justify-between">
        <div>
          <div className="flex flex-col gap-[1rem] text-left">
            <label className="text-principal font-bold text-text">
              NOME COMPLETO:
            </label>
            <input
              className="text-principal cursor-default text-text border-black border-[1px] rounded-full mb-12 w-[350px] py-2 px-4"
              type="text"
              value={userDisplayName}
              disabled
            />
          </div>

          <div className="flex flex-col gap-[1rem] text-left">
            <label className="text-principal font-bold text-text">EMAIL:</label>

            <input
              className="text-principal cursor-default text-text border-black border-[1px] rounded-full mb-12 w-[350px] py-2 px-4"
              type="email"
              value={userEmail}
              disabled
            />
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-[1rem] text-left">
            <label className="text-principal font-bold text-text">CPF:</label>
            <input
              className="text-principal cursor-default text-text border-black border-[1px] rounded-full mb-12 w-[350px] py-2 px-4"
              type="text"
              disabled
            />
          </div>

          <div className="flex flex-col gap-[1rem] text-left">
            <label className="text-principal font-bold text-text">
              TELEFONE:
            </label>
            <input
              className="text-principal cursor-default text-text border-black border-[1px] rounded-full mb-12 w-[350px] py-2 px-4"
              type="text"
              disabled
            />
          </div>
        </div>
      </div>

      <button
        onClick={onClickToDelete}
        className="px-8 py-2 m-auto my-20 text-white font-bold w-fit cursor-pointer bg-black rounded-[38px]"
      >
        cancelar conta
      </button>
    </div>
  );
}
