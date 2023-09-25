import {Image} from '@shopify/hydrogen';
import {useAtom} from 'jotai';
import {Suspense, useEffect, useState} from 'react';
import {isWishlistModalOpenAtom} from '../../atoms/is-wishlist-modal-open';
import {accessTokenAtom, userIdAtom} from '../../atoms/user';
import {wishlistAtom} from '../../atoms/wishlist';
import {handleItemList} from '../../utils/handleItemList';
import {ConfirmToProductModal} from '../Popups/ConfirmToProductModal.client';
import {signStateAtom} from '../Sign/atoms/sign-state';

export default function ProductCard({product}) {
  const [wishlist, setWishlist] = useAtom(wishlistAtom);
  const [, setIsWishlistModalOpen] = useAtom(isWishlistModalOpenAtom);
  const [accessToken] = useAtom(accessTokenAtom);
  const [, setSignState] = useAtom(signStateAtom);
  const [userId] = useAtom(userIdAtom);
  const [redirect, setRedirect] = useState('');

  const handleClick = async () => {
    if (!accessToken) {
      setIsWishlistModalOpen(true);
      setSignState('signin');
      return;
    }

    const list = await handleItemList(product, wishlist, userId);

    setWishlist(list);
  };
  useEffect(() => {
    return () => {
      setRedirect('');
    };
  }, []);

  const isSelected = wishlist?.some((item) => item.id === product.id);

  return (
    <>
      <div className="shadow-[0_4px_15px_0px_rgba(0,0,0,0.15)] items-start relative w-[250px] lg:w-[274px] h-[427px] duration-500 ease-in-out transform hover:scale-105">
        <button
          className="w-[50px] h-[50px] absolute top-0 right-0 hover:scale-110 flex justify-center items-center"
          onClick={handleClick}
        >
          <Image
            src={isSelected ? '/heart.svg' : '/empty-heart.svg'}
            alt="heart"
            width="24px"
            height="24px"
          />
        </button>
        <div
          className="cursor-pointer"
          onClick={() => setRedirect(encodeURIComponent(product?.handle))}
        >
          {product?.featuredImage.src ? (
            <Image
              className="bg-white w-[274px] h-[328px] object-contain"
              src={product?.featuredImage.src}
              alt={product?.handle}
              width="274px"
              height="328px"
            />
          ) : null}
          <div className="p-3 h-[99px] flex flex-col justify-between">
            <p className="text-principal text-text text-left pr-7">
              {product?.title}
            </p>

            <div className="flex -ml-[4px]">
              {product?.collections?.length > 0 &&
                product?.collections?.map((collection) => (
                  <Image
                    key={collection?.handle}
                    src={collection?.metafields[0]?.value ?? '#'}
                    alt={collection?.handle}
                    width="47px"
                    height="47px"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      {redirect && (
        <Suspense>
          <ConfirmToProductModal link={redirect} />
        </Suspense>
      )}
    </>
  );
}
