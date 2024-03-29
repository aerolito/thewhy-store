import {useNavigate} from '@shopify/hydrogen/client';
import {getAuth} from 'firebase/auth';
import {useAtom} from 'jotai';
import {useEffect, useState} from 'react';
import {isSettingsModalOpenAtom} from '../../atoms/is-settings-modal-open';
import {isWishlistModalOpenAtom} from '../../atoms/is-wishlist-modal-open';
import {accessTokenAtom, userIdAtom} from '../../atoms/user';
import {app} from '../../configs/firebase';
import {getUserData} from '../../services/getUserData';
import handleDeleteUser from '../../services/handleDeleteUser';
import {handleSigout} from '../../services/handleSignout';
import {sleep} from '../../utils/sleep';

export default function SettingsForm() {
  const [, setIsWishlistModalOpen] = useAtom(isWishlistModalOpenAtom);
  const [, setIsSettingsModalOpen] = useAtom(isSettingsModalOpenAtom);
  const [, setAccessToken] = useAtom(accessTokenAtom);
  const [, setUserId] = useAtom(userIdAtom);
  const [userDisplayName, setUserDisplayName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [cpf, setCpf] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const auth = getAuth(app);

  const getDataUser = async () => {
    const auth = getAuth(app);
    await sleep(2000);
    const id = auth.currentUser.uid;

    await getUserData(id)?.then((data) => {
      if (!data) return setIsLoading(false);

      setUserDisplayName(data?.displayName);
      setUserEmail(data?.email);
      setBirthdate(data?.birthDate);
      setCpf(data?.cpf);
      setPhoneNumber(data?.phoneNumber);
    });

    setIsLoading(false);
  };

  useEffect(() => {
    setIsWishlistModalOpen(false);
    setIsSettingsModalOpen(false);

    getDataUser();
  }, []);

  const onClickToDelete = async () => {
    handleDeleteUser(auth);
    const response = await handleSigout(auth);

    if (!response) return;

    setAccessToken('');
    setUserId('');
    setUserDisplayName('');
    setUserEmail('');
    setBirthdate('');
    setCpf('');
    setPhoneNumber('');
    setIsSettingsModalOpen(false);

    navigate('/', {replace: false});
  };

  return (
    <div className="text-center flex flex-col justify-center items-left gap-10">
      <div className="flex w-full justify-between flex-col md:flex-row">
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

          <div className="flex flex-col gap-[1rem] text-left">
            <label className="text-principal font-bold text-text">
              DATA DE NASCIMENTO:
            </label>
            <input
              className="text-principal cursor-default text-text border-black border-[1px] rounded-full mb-12 w-[350px] py-2 px-4"
              type="text"
              value={birthdate}
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
              value={cpf}
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
              value={phoneNumber}
              disabled
            />
          </div>
        </div>
      </div>

      <button
        disabled={isLoading}
        onClick={onClickToDelete}
        className={` ${
          isLoading && 'opacity-30 cursor-default'
        } px-8 py-2 m-auto mb-20 text-white font-bold w-fit cursor-pointer bg-black rounded-[38px]`}
      >
        {isLoading ? '...' : 'cancelar conta'}
      </button>
    </div>
  );
}
