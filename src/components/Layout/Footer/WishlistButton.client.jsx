import {useNavigate} from '@shopify/hydrogen/client';
import {useAtom} from 'jotai';
import {isWishlistModalOpenAtom} from '../../../atoms/is-wishlist-modal-open';
import {accessTokenAtom} from '../../../atoms/user';

export default function WishlistButton() {
  const [, setIsWishlistModalOpen] = useAtom(isWishlistModalOpenAtom);
  const [accessToken] = useAtom(accessTokenAtom);

  const navigate = useNavigate();

  const onClickToWishlist = async () => {
    if (!accessToken) {
      window.location = '#home';
      setIsWishlistModalOpen(true);
      return;
    }

    navigate('/favoritos', {replace: false});
  };

  return (
    <li
      onClick={onClickToWishlist}
      className="cursor-pointer flex items-center text-sm font-normal text-white hover:text-gray-900"
    >
      Lista de desejos
    </li>
  );
}
