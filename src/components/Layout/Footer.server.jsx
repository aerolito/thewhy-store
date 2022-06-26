import {Link} from '@shopify/hydrogen';
import {Suspense} from 'react';
import NewsletterInput from './NewsletterInput.client';
import {BoxFallback} from './BoxFallback.server';

export default function Footer() {
  return (
    <footer role="contentinfo">
      <div className="relative bg-black  border-t border-b border-black border-opacity-5 ">
        <div className="flex flex-col md:flex-row justify-between mx-auto  max-w-[970px] px-4 py-20 md:px-8">
          <div>
            <p className="text-text font-bold text-white uppercase mb-8">
              SOBRE
            </p>
            <ul className=" space-y-4">
              <li className="text-sm font-bold text-white hover:text-gray-900">
                <Link to={`/missao`}> Missão</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-text mt-12 md:mt-0 font-bold uppercase mb-8 text-white">
              FAÇA PARTE
            </p>
            <ul className=" space-y-4">
              <li className="flex items-center text-sm font-bold text-white hover:text-gray-900">
                <Link to={`/fale-conosco`}>Fale conosco</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-text mt-12 md:mt-0 font-bold uppercase mb-8  text-white">
              ASSINAR NEWSLETTER
            </p>

            <Suspense fallback={<BoxFallback />}>
              <NewsletterInput />
            </Suspense>
          </div>
          <div>
            <p className="text-text mt-12 md:mt-0 font-bold uppercase mb-8  text-white">
              ENCONTRE-NOS
            </p>
            <ul className=" space-y-4">
              <li className="flex items-center text-sm font-bold text-white hover:text-gray-900">
                <a
                  href="https://www.instagram.com/the.whystore/"
                  target="_blank"
                >
                  <img src="/instagram-logo.svg" width="30px" height="30px" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
