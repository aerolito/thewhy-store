import {Link} from '@shopify/hydrogen';
import {Suspense} from 'react';
import NewsletterInput from './Footer/NewsletterInput.client';
import {BoxFallback} from './BoxFallback.server';
import WishlistButton from './Footer/WishlistButton.client';
import MyAccountButton from './Footer/MyAccountButton.client';

export default function Footer() {
  return (
    <footer role="contentinfo">
      <div className="relative bg-black  border-t border-b border-black border-opacity-5 ">
        <div className="flex flex-col md:flex-row justify-between mx-auto  max-w-[970px] px-4 py-20 md:px-8">
          <div>
            <p className="text-text font-semibold text-white uppercase mb-4">
              INSTITUCIONAL
            </p>
            <ul className=" space-y-4">
              <li className="text-sm font-normal text-white hover:text-gray-900">
                <Link to={`/missao`}> Missão</Link>
              </li>
              <li className="text-sm font-normal text-white hover:text-gray-900">
                <Link to={`/termos`}> Termos e condições</Link>
              </li>
              <li className="flex items-center text-sm font-normal text-white hover:text-gray-900">
                <Link to={`/fale-conosco`}>Fale conosco</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-text mt-12 md:mt-0 font-semibold uppercase  mb-4 text-white">
              MINHA CONTA
            </p>
            <ul className=" space-y-4">
              <Suspense fallback={<BoxFallback />}>
                <MyAccountButton />
              </Suspense>
              <Suspense fallback={<BoxFallback />}>
                <WishlistButton />
              </Suspense>
            </ul>
          </div>
          <div>
            <p className="text-text mt-12 md:mt-0 font-semibold uppercase  mb-4  text-white">
              RECEBA NOSSA NEWSLETTER
            </p>

            <Suspense fallback={<BoxFallback />}>
              <NewsletterInput />
            </Suspense>
          </div>
          <div>
            <p className="text-text mt-12 md:mt-0 font-semibold uppercase mb-4 text-white">
              ATENDIMENTO
            </p>
            <ul className=" space-y-4">
              <li className="flex items-center text-sm font-semibold text-white hover:text-gray-900">
                TELEFONE
              </li>
              <li className="flex items-center text-sm font-normal text-white hover:text-gray-900">
                48 996687061
              </li>
              <li className="flex items-center text-sm font-semibold text-white hover:text-gray-900">
                E-MAIL
              </li>
              <li className="flex items-center text-sm font-normal text-white hover:text-gray-900">
                tws@aeroli.to
              </li>
              <li className="flex items-center text-sm font-normal text-white hover:text-gray-900">
                09:00 - 18:00
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
