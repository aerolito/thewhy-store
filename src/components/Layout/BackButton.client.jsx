import {useEffect, useState} from 'react';

export function BackButton() {
  const onClick = () => {
    window.history.back();
  };
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    !isSSR &&
    (window?.location?.pathname !== '/' &&
    window?.location?.pathname !== '/cancelar-inscricao' ? (
      <div className="mb-6 md:mb-12 w-full max-w-[1900px] px-6 md:px-12">
        <button
          onClick={onClick}
          className="cursor-pointer text-text border-none background-transparent"
        >{`< Voltar`}</button>
      </div>
    ) : null)
  );
}
