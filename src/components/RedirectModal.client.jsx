import {useNavigate} from '@shopify/hydrogen/client';
import {useEffect, useState} from 'react';

export default function RedirectModal({link}) {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState('15');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      setRedirect(true);
    } else {
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
  }, [countdown]);

  if (redirect) {
    return navigate(link);
  }

  return (
    <div className="z-50 fixed bg-black text-white font-bold w-screen h-screen inset-0 flex flex-col items-center justify-center gap-12">
      <img
        src="/white-logo.svg"
        width="198px"
        height="139px"
        className="w-[100px]"
      />

      <p className="text-text w-[90%] max-w-[550px] text-center">
        SE VOCÊ CHEGOU ATÉ AQUI ACREDITAMOS QUE TENHA REFLETIDO SOBRE SUA COMPRA
        E JÁ PODE SER CONSIDERADO UM CONSUMIDOR CONSCIENTE, QUE AINDA PODE FAZER
        MUITO MAIS PELOS FUTURO SE PENSAR MELHOR
      </p>

      <span className="text-title">
        00:{countdown < 10 ? `0${countdown}` : countdown}
      </span>
    </div>
  );
}
