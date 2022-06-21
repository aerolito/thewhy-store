import Wishlist from '../components/Wishlist.client';
import {Slogan} from '../components/Slogan.server';
import {BackButton} from '../components/BackButton.client';

export default function WishlistPage() {
  return (
    <>
      <Slogan />{' '}
      <h2 className="text-principal font-bold text-subtitleMobile md:text-subtitle text-center">
        favoritos
      </h2>
      <div className="text-center flex justify-center min-h-[50vh] items-start mt-12 mb-[2rem]">
        <Wishlist />
      </div>
    </>
  );
}
