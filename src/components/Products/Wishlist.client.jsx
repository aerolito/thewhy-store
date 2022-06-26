import {useAtom} from 'jotai';
import {wishlistAtom} from '../../atoms/wishlist';
import ProductCard from './ProductCard.client';

export default function Wishlist() {
  const [wishlist] = useAtom(wishlistAtom);

  return (
    <div className="flex gap-9 flex-wrap justify-center">
      {wishlist && wishlist?.length > 0 ? (
        wishlist?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <h3 className="justify-start font-bold text-principal text-smallTitle">
          Você ainda não adicionou nenhum produto aos favoritos.
        </h3>
      )}
    </div>
  );
}
