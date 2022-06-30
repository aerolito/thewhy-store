import {useNavigate} from '@shopify/hydrogen/client';
import {useAtom} from 'jotai';
import {isWishlistModalOpenAtom} from '../../../atoms/is-wishlist-modal-open';
import {accessTokenAtom} from '../../../atoms/user';

export default function MyAccountButton() {
  const [, setIsWishlistModalOpen] = useAtom(isWishlistModalOpenAtom);
  const [accessToken] = useAtom(accessTokenAtom);

  const navigate = useNavigate();

  const onClickToMyAccount = async () => {
    if (!accessToken) {
      window.location = '#home';
      setIsWishlistModalOpen(true);
      return;
    }

    navigate('/configuracoes', {replace: true});
  };

  return (
    <li
      onClick={onClickToMyAccount}
      className=" cursor-pointer flex items-center text-sm font-normal text-white hover:text-gray-900"
    >
      Minha conta
    </li>
  );
}
