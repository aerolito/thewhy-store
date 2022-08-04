import {useNavigate} from '@shopify/hydrogen/client';
import {useState, useEffect} from 'react';
import {catchphrases} from '../../constants/catchphrases';

export function ConfirmToProductModal({link}) {
  const [randomCatchphrase, setRandomCatchphrase] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setRandomCatchphrase(Math.floor(Math.random() * catchphrases.length));
  }, [link]);

  return (
    <>
      <div className="z-30 fixed top-0 left-0 w-screen h-screen bg-black opacity-30" />
      <div className="bg-black translate-x-1/2 -translate-y-1/2 fixed right-[50vw] top-[50vh] z-50 rounded-lg w-[80vw] max-w-[550px]">
        <div className=" h-full max-h-[443px] p-12 text-center flex flex-col gap-8 justify-center items-center">
          <span className=" text-text md:text-smallTitle font-bold text-center text-white whitespace-pre">
            {catchphrases[randomCatchphrase] ??
              'Compre menos. Compre melhor. E se estiver na dúvida, talvez nem seja o caso de comprar.'}
          </span>
          <button
            onClick={() => navigate(`/produtos/${link}`, {replace: false})}
            type="button"
            className="text-principal m-[0px] bg-white font-medium w-fit rounded-full text-[14px] p-1.5 px-[30px] hover:opacity-80"
          >
            ok
          </button>
        </div>
      </div>
    </>
  );
}
