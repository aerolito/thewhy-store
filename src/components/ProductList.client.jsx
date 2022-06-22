import {useAtom} from 'jotai';
import {useEffect} from 'react';
import {BrandFilterSelectedAtom} from '../atoms/brand-filter-selected';
import {CollectionFilterSelectedAtom} from '../atoms/collection-filter-selected';
import {productListAtom} from '../atoms/product-list';
import ProductCard from '../components/ProductCard.client';

export default function ProductList({products}) {
  const [productList, setProductList] = useAtom(productListAtom);

  const [collectionFilter] = useAtom(CollectionFilterSelectedAtom);
  const [brandFilter] = useAtom(BrandFilterSelectedAtom);

  const hasFilter = collectionFilter?.length > 0 || brandFilter?.length > 0;

  useEffect(() => {
    if (!(productList.length > 0)) setProductList(products);
  }, []);

  return (
    <div className="flex gap-x-9 gap-y-[4.5rem] flex-wrap justify-center md:justify-start relative ">
      {productList && productList?.length > 0
        ? productList?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        : hasFilter && (
            <h3 className="font-bold text-principal text-smallTitle m-auto">
              Não temos esse produto :(
            </h3>
          )}
    </div>
  );
}
