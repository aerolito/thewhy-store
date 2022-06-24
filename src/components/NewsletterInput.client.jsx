import {useState} from 'react';
import {handleNewsletterMailling} from '../services/handleNewsletterMailling';

export default function NewsletterInput() {
  const [email, setEmail] = useState('');

  // verificar se o user já está cadastrado e disparar popups aqui

  return (
    <>
      <div className="relative max-w-[254px]">
        <input
          className="text-principal text-smallText rounded-full px-4 pr-12 h-[34px]"
          placeholder="Insira seu e-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <img
          onClick={() => handleNewsletterMailling(email)}
          className="absolute right-[40px] md:right-[24px] md:right-[16px] top-[5px] cursor-pointer bg-white"
          src="/send.svg"
          width="24px"
          height="24px"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleNewsletterMailling(email);
            }
          }}
        />
      </div>
    </>
  );
}
