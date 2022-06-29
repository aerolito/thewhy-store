import {useState, useEffect} from 'react';
import Navigation from './Navigation.client';
import {Link} from '@shopify/hydrogen/client';
import {useNavigate} from '@shopify/hydrogen/client';
import {isWishlistModalOpenAtom} from '../../atoms/is-wishlist-modal-open';
import {useAtom} from 'jotai';
import Sign from '../Sign/index.client';
import {accessTokenAtom, userIdAtom} from '../../atoms/user';
import {getWishlist} from '../../services/getWishlist';
import {wishlistAtom} from '../../atoms/wishlist';
import SettingsDecision from '../Sign/SettingsDecision.client';
import {isSettingsModalOpenAtom} from '../../atoms/is-settings-modal-open';

export default function Header({collections}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useAtom(
    isWishlistModalOpenAtom,
  );
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useAtom(
    isSettingsModalOpenAtom,
  );
  const [wishlist, setWishlist] = useAtom(wishlistAtom);
  const navigate = useNavigate();
  const [accessToken] = useAtom(accessTokenAtom);

  const [userId] = useAtom(userIdAtom);

  useEffect(() => {
    if (!userId) return;

    getWishlist(userId).then((databaseWishlist) => {
      if (!databaseWishlist) return;

      setWishlist(databaseWishlist);
    });
  }, [userId]);

  function handleWishlistAccess() {
    if (!accessToken) {
      setIsWishlistModalOpen(true);
      return;
    }

    navigate('/favoritos', {replace: true});
  }

  function handleUserAccess() {
    if (!accessToken) {
      setIsWishlistModalOpen(true);
      return;
    }

    setIsSettingsModalOpen(true);
  }

  return (
    <>
      <header className="pt-4" role="banner">
        <div className="z-20  w-full px-[1rem] md:px-[2rem] lg:pb-0 mx-auto bg-white">
          <div className="h-full flex  place-content-between">
            <div className="text-center w-full flex justify-between items-center">
              <Navigation
                collections={collections}
                isOpen={isMobileNavOpen}
                setIsOpen={setIsMobileNavOpen}
              />
              <Link to="/">
                <img
                  src="/black-logo.svg"
                  width="80px"
                  height="80px"
                  className="cursor-pointer"
                />
              </Link>
              <div className="flex gap-2">
                <div onClick={handleUserAccess}>
                  <img
                    src="/user.svg"
                    width="24px"
                    height="24px"
                    className="cursor-pointer hover:opacity-80"
                    alt="user"
                  />
                </div>
                <div onClick={handleWishlistAccess}>
                  <img
                    src={
                      wishlist?.length > 0 ? '/heart.svg' : '/empty-heart.svg'
                    }
                    width="24px"
                    height="24px"
                    className="cursor-pointer hover:opacity-80"
                    alt="favoritos"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {isWishlistModalOpen && <Sign />}
      {isSettingsModalOpen && <SettingsDecision />}
    </>
  );
}
