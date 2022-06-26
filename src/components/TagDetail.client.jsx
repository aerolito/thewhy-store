import {useAtom} from 'jotai';
import {useEffect} from 'react';
import {CollectionPageSelectedAtom} from '../atoms/collection-page-selected';
import {isMobile} from 'react-device-detect';

export default function TagDetail({collections}) {
  const [selectedCollection, setSelectedCollection] = useAtom(
    CollectionPageSelectedAtom,
  );

  const collection = collections?.find((col) =>
    selectedCollection
      ? col.handle === selectedCollection
      : col.handle === collections[0]?.handle,
  );

  useEffect(() => {
    if (isMobile) {
      window.location = `#${collection.handle}`;
    }
  }, []);

  return (
    <>
      <div className="text-center flex flex-col justify-center items-center  mb-12">
        <h2 className="text-principal text-subtitleMobile md:text-subtitle font-bold mb-12 mt-6">
          nossos critérios
        </h2>
        <div className="flex w-full items-center md:justify-between flex-col md:flex-row">
          {collections?.map((coll) => {
            const isSelected = collection?.handle === coll.handle;

            if (isMobile) {
              return (
                <a href="#description">
                  <img
                    id={coll.handle}
                    key={coll.handle}
                    onClick={() => {
                      setSelectedCollection(coll.handle);
                    }}
                    width="115px"
                    height="115px"
                    src={coll.metafields[0]?.value}
                    alt={coll.title}
                    className={`cursor-pointer ${!isSelected && 'opacity-30'}`}
                  />
                </a>
              );
            }
            return (
              <img
                id={coll.handle}
                key={coll.handle}
                onClick={() => {
                  setSelectedCollection(coll.handle);
                }}
                width="115px"
                height="115px"
                src={coll.metafields[0]?.value}
                alt={coll.title}
                className={`cursor-pointer ${!isSelected && 'opacity-30'}`}
              />
            );
          })}
        </div>
      </div>
      <div
        id="description"
        className="flex flex-col text-left gap-4 mt-[-10px] mb-12"
      >
        <h4 className="text-smallTitle text-principal font-bold">
          {collection?.title}
        </h4>
        <div dangerouslySetInnerHTML={{__html: collection?.descriptionHtml}}>
          {collection?.description}
        </div>
      </div>
    </>
  );
}
