import {useState} from 'react';
import {toast} from './Toast.client';

export default function Searcher() {
  const [searchQuery, setSearchQuery] = useState('');

  const onHandleSearch = () => {
    if (!searchQuery) {
      return toast.warning('Você precisa digitar o que procura.');
    }

    window.location = `/produtos?filter=${encodeURIComponent(searchQuery)}`;
    setSearchQuery('');
  };

  return (
    <div
      id="searcher"
      className="text-center flex flex-col justify-center items-center"
    >
      <h2 className="text-principal text-subtitleMobile md:text-subtitle font-bold mb-12 mt-6">
        o que você precisa?
      </h2>
      <div className="relative w-full max-w-[450px]">
        <input
          className="w-full text-principal text-text border-principal p-2 border-[3px] rounded-full mb-6 px-8 pr-14 h-[60px]"
          placeholder="EX: camisetas, calças, tênis..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onHandleSearch();
            }
          }}
        />
        <img
          onClick={onHandleSearch}
          className="absolute right-[1rem] top-[11px] cursor-pointer bg-white"
          src="/search-icon.svg"
          width="35px"
          height="35px"
        />
      </div>
    </div>
  );
}
