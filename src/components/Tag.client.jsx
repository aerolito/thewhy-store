import {useNavigate} from '@shopify/hydrogen/client';
import {useAtom} from 'jotai';
import {CollectionPageSelectedAtom} from '../atoms/collection-page-selected';

export default function Tag({collection}) {
  const navigate = useNavigate();
  const [, setCollectionPageSelected] = useAtom(CollectionPageSelectedAtom);

  const onClickOnTag = (tagSelected) => {
    navigate(`/criterios`);
    setCollectionPageSelected(tagSelected);
  };

  return (
    <img
      onClick={() => {
        onClickOnTag(collection?.handle);
      }}
      className="cursor-pointer 
    w-[137px]
    h-[170px]"
      src={collection?.metafields[1]?.value}
      alt={collection?.title}
    />
  );
}
