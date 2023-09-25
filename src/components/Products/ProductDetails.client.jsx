import {flattenConnection, useNavigate} from '@shopify/hydrogen/client';
import {useAtom} from 'jotai';
import {Suspense, useState} from 'react';
import {CollectionPageSelectedAtom} from '../../atoms/collection-page-selected';
import {isWishlistModalOpenAtom} from '../../atoms/is-wishlist-modal-open';
import {accessTokenAtom, userIdAtom} from '../../atoms/user';
import {wishlistAtom} from '../../atoms/wishlist';
import {handleItemList} from '../../utils/handleItemList';
import Carousel from './Carousel.client';
import ProductOptions from './ProductOptions.client';
import RedirectModal from '../Popups/RedirectModal.client';
import {signStateAtom} from '../Sign/atoms/sign-state';

export default function ProductDetails({product, vendorData}) {
  const unformattedCollections = flattenConnection(product?.collections);
  const link = product.metafields[0].value;

  const collections = unformattedCollections
    ? unformattedCollections?.map((collection) => {
        return {
          ...collection,
          metafields: collection.metafields[0],
        };
      })
    : null;

  const images = flattenConnection(product.media)?.map((image) => {
    return {
      src: image.image.url,
    };
  });

  const variants = flattenConnection(product.variants);

  const [, setCollectionPageSelected] = useAtom(CollectionPageSelectedAtom);
  const [wishlist, setWishlist] = useAtom(wishlistAtom);
  const [, setIsWishlistModalOpen] = useAtom(isWishlistModalOpenAtom);
  const [accessToken] = useAtom(accessTokenAtom);
  const [, setSignState] = useAtom(signStateAtom);
  const [userId] = useAtom(userIdAtom);
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState('');

  const onClickOnTag = (tagSelected) => {
    navigate(`/criterios`);
    setCollectionPageSelected(tagSelected);
  };

  const handleClick = async () => {
    if (!accessToken) {
      setIsWishlistModalOpen(true);
      setSignState('signin');
      return;
    }

    const list = await handleItemList(product, wishlist, userId);

    setWishlist(list);
  };

  const isSelected = wishlist?.some((item) => item.id === product.id);

  return (
    <>
      <div className="flex pb-20 gap-12 md:gap-0 w-full h-full items-center md:items-start justify-center flex-col md:flex-row">
        <div className="max-h-[585px] max-w-[585px] w-[90%] md:w-1/2 h-full object-contain">
          <Carousel images={images} />
        </div>
        <div className="gap-8 md:pl-8 md:h-[523.5px] flex flex-col w-[100%] md:w-1/2 justify-between">
          <div>
            <h3 className="text-principal text-smallTitle font-bold">
              {product.title}
            </h3>
            {product.vendor && (
              <div className="text-principal text-text mt-8">
                <span>MARCA: </span>
                <span className="font-bold">{product?.vendor}</span>
              </div>
            )}
            <span />

            <div className="flex flex-col mt-8 gap-8">
              <ProductOptions variants={variants} />

              <div
                onClick={handleClick}
                className="flex items-center gap-4 cursor-pointer"
              >
                <img
                  src={isSelected ? '/heart.svg' : '/empty-heart.svg'}
                  alt="empty heart"
                  width="32px"
                  height="32px"
                />
                <span>ADICIONAR A LISTA DE DESEJOS</span>
              </div>
              {link && (
                <button
                  onClick={() => setRedirect(link)}
                  className="rounded-full text-[14px] bg-principal p-2 px-[30px] text-white hover:opacity-80 w-fit"
                >
                  Ir para a Loja
                </button>
              )}
            </div>
          </div>{' '}
          <div className="flex flex-wrap gap-2 items-center md:items-left">
            {collections?.map((collection) => {
              return (
                <img
                  key={collection?.handle}
                  className="cursor-pointer"
                  src={collection?.metafields.value}
                  width="100px"
                  height="100px"
                  onClick={() => onClickOnTag(collection?.handle)}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-principal py-8 px-2 text-principal text-text">
        <h5 className="text-highlighted mb-4">TRANSPARÊNCIA DO PRODUTO</h5>
        <div dangerouslySetInnerHTML={{__html: product.descriptionHtml}} />
      </div>
      <div className="border-t border-principal py-8 px-2 text-principal text-text mb-12">
        <h5 className="text-highlighted mb-4">TRANSPARÊNCIA DA MARCA</h5>
        <div
          dangerouslySetInnerHTML={{__html: vendorData?.pageByHandle?.body}}
        />
      </div>
      {redirect && (
        <Suspense>
          <RedirectModal link={redirect} />
        </Suspense>
      )}
    </>
  );
}
