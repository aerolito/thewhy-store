import {useAtom} from 'jotai';
import {productListAtom} from '../atoms/product-list';
import {CollectionFilterSelectedAtom} from '../atoms/collection-filter-selected';
import {BrandFilterSelectedAtom} from '../atoms/brand-filter-selected';

export default function Filter({options, products, type, label}) {
  const [_, setProductList] = useAtom(productListAtom);
  const [collectionFilter, setCollectionFilter] = useAtom(
    CollectionFilterSelectedAtom,
  );
  const [brandFilter, setBrandFilter] = useAtom(BrandFilterSelectedAtom);

  const handleFilterBy = (option) => {
    const filtered = products
      .filter((product) => {
        const filtersByBrands =
          type === 'brands' && brandFilter.includes(option)
            ? brandFilter.filter((item) => item !== option)
            : type === 'brands'
            ? [...brandFilter, option]
            : brandFilter;

        setBrandFilter(filtersByBrands);

        if (filtersByBrands.length === 0) return true;

        return filtersByBrands?.includes(product.vendor);
      })
      .filter((product) => {
        const filtersByCollection =
          type === 'collections' && collectionFilter.includes(option)
            ? collectionFilter.filter((item) => item !== option)
            : type === 'collections'
            ? [...collectionFilter, option]
            : collectionFilter;

        setCollectionFilter(filtersByCollection);

        if (filtersByCollection.length === 0) return true;

        return product.collections.find((collection) =>
          filtersByCollection?.includes(collection.title),
        );
      });

    setProductList(filtered);
  };

  return (
    <div className="uppercase text-principal text-small flex flex-col items-start w-[274px]">
      <h5>{label}</h5>
      <div className="flex flex-col gap-2 m-8 mt-4 ml-0 items-start flex-wrap">
        {options?.map((option) => {
          return (
            <div className="flex" key={option}>
              <div className="flex items-center">
                <input
                  id={option}
                  type="checkbox"
                  onChange={() => handleFilterBy(option)}
                  value=""
                  className=" cursor-pointer w-5 h-5 accent-black"
                />
              </div>
              <label
                htmlFor={option}
                className=" cursor-pointer pl-2 text-smallText"
              >
                {option}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
