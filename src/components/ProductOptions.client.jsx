export default function ProductOptions({variants}) {
  console.log(variants);
  return (
    <>
      {variants && variants[0].title !== 'Default Title' && (
        <div>
          <legend className="mb-4 text-text text-principal">
            TAMANHOS DISPONÍVEIS:
          </legend>
          <div className="flex items-center flex-wrap gap-2">
            {variants?.map((variant) => {
              return (
                <div
                  key={variant?.id}
                  className={`p-2 border text-text min-w-[41px] text-center cursor-default font-bold ${
                    !variant?.availableForSale
                      ? 'text-principal'
                      : 'bg-principal text-white'
                  }`}
                >
                  {variant?.title}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
