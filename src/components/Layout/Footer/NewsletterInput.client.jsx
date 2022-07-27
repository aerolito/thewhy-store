import {useState} from 'react';
import {handleNewsletterMailling} from '../../../services/handleNewsletterMailling';
import {toast} from '../../Popups/Toast.client';

export default function NewsletterInput() {
  const [email, setEmail] = useState('');

  const onClickToNewsletter = async () => {
    setEmail('');
    const res = await handleNewsletterMailling(email);

    if (!res) return;

    toast.success(`Você foi inscrito na newsletter`);
  };

  return (
    <div className="relative w-full max-w-[242px]">
      <input
        className="text-white w-full text-smallText rounded-full px-4 py-2 pr-16 border-[1px] bg-black border-white focus:outline-none focus:border-gray-300"
        placeholder="Insira seu e-mail"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onClickToNewsletter();
          }
        }}
      />

      <button
        onClick={onClickToNewsletter}
        className="border-none background-transparent absolute right-3 top-[50%] -translate-y-1/2 text-white"
      >
        enviar
      </button>
    </div>
  );
}
