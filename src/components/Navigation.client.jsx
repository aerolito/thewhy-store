import {Fragment} from 'react';
import {Link} from '@shopify/hydrogen/client';
import OpenIcon from './OpenIcon';

export default function Navigation({isOpen, setIsOpen}) {
  const OpenFocusTrap = Fragment;

  return (
    <div>
      <OpenFocusTrap>
        <button
          type="button"
          className="flex pl-[1rem] items-center w-[56px] h-full cursor-pointer"
          onClick={() => setIsOpen((previousIsOpen) => !previousIsOpen)}
        >
          <span className="sr-only">{isOpen ? 'Close' : 'Open'} Menu</span>
          {isOpen ? (
            <div className="w-[56px]">
              <CloseIcon />
            </div>
          ) : (
            <div className="w-[56px]">
              <OpenIcon />
            </div>
          )}
        </button>
        {isOpen ? (
          <div className=" bg-white absolute top-10 z-10 px-4 pb-7 mt-7 ">
            <ul>
              <li>
                <Link
                  className="group py-2 text-highlighted text-principal flex items-center justify-between hover:text-hovered"
                  to={`/`}
                  onClick={() => setIsOpen(false)}
                >
                  HOME
                </Link>
              </li>

              <li>
                <Link
                  className="group py-2 text-highlighted text-principal flex items-center justify-between  hover:text-hovered"
                  to={`/missao`}
                  onClick={() => setIsOpen(false)}
                >
                  MISSÃO
                </Link>
              </li>

              <li>
                <a
                  className="group py-2 text-highlighted text-principal flex items-center justify-between  hover:text-hovered"
                  href={`/conteudos`}
                  onClick={() => setIsOpen(false)}
                >
                  CONTEÚDOS
                </a>
              </li>

              <li>
                <a
                  className="group py-2 text-highlighted text-principal flex items-center justify-between  hover:text-hovered"
                  href={`/criterios`}
                  onClick={() => setIsOpen(false)}
                >
                  CRITÉRIOS
                </a>
              </li>

              <li>
                <Link
                  className="group py-2 text-highlighted text-principal flex items-center justify-between  hover:text-hovered"
                  to={`https://aeroli.to`}
                  onClick={() => setIsOpen(false)}
                >
                  AEROLITO
                </Link>
              </li>
            </ul>
          </div>
        ) : null}
      </OpenFocusTrap>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 17L17 1M1 1L17 17"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
