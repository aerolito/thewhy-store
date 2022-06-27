import {useState} from 'react';
import {handleNewsletterMailling} from '../../services/handleNewsletterMailling';
import {toast} from '../Popups/Toast.client';

export default function NewsletterInput() {
  const [email, setEmail] = useState('');

  const onClickToNewsletter = async () => {
    const res = await handleNewsletterMailling(email);

    if (!res) return;

    toast.success(`Você foi inscrito na newsletter`);
  };

  return (
    <div className="relative max-w-[254px]">
      <input
        className="text-principal text-smallText rounded-full px-4 pr-12 h-[34px]"
        placeholder="Insira seu e-mail"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onClickToNewsletter();
          }
        }}
      />
      <img
        onClick={onClickToNewsletter}
        className="absolute right-[40px] md:right-[24px] md:right-[16px] top-[5px] cursor-pointer bg-white"
        src="/send.svg"
        width="24px"
        height="24px"
      />
    </div>
  );
}
