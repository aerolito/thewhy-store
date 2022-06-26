import {useState} from 'react';
import {useAtom} from 'jotai';
import {isWishlistModalOpenAtom} from '../atoms/is-wishlist-modal-open';
import {accessTokenAtom} from '../atoms/user';
import {handleNewsletterMailling} from '../services/handleNewsletterMailling';
import {signStateAtom} from './Sign/atoms/sign-state';
import {toast} from './Toast.client';

export default function NewsletterInput() {
  const [, setIsWishlistModalOpen] = useAtom(isWishlistModalOpenAtom);
  const [accessToken] = useAtom(accessTokenAtom);
  const [, setSignState] = useAtom(signStateAtom);
  const [email, setEmail] = useState('');

  const onClickToNewsletter = async () => {
    if (!accessToken) {
      setIsWishlistModalOpen(true);
      setSignState('signin');
      return;
    }

    const res = await handleNewsletterMailling(email);

    if (!res) return;

    toast.success(`Você foi inscrito na newsletter`);
  };

  return (
    <>
      <div className="relative max-w-[254px]">
        <input
          className="text-principal text-smallText rounded-full px-4 pr-12 h-[34px]"
          placeholder="Insira seu e-mail"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <img
          onClick={onClickToNewsletter}
          className="absolute right-[40px] md:right-[24px] md:right-[16px] top-[5px] cursor-pointer bg-white"
          src="/send.svg"
          width="24px"
          height="24px"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onClickToNewsletter();
            }
          }}
        />
      </div>
    </>
  );
}
