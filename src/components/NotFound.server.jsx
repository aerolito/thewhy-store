import {Link} from '@shopify/hydrogen';

function NotFoundHero() {
  return (
    <div className="h-screen">
      <div className="max-w-3xl text-center mx-4 md:mx-auto">
        <h1 className="font-bold text-4xl md:text-5xl text-gray-900 mb-6 mt-6">
          Não encontramos essa página :(
        </h1>
        <p className="text-lg m-8 text-gray-500">
          Click aqui para voltar para a página inicial.
        </p>
        <Link
          className=" cursor-pointer rounded-full text-[14px] bg-principal p-2 px-[30px] text-white hover:opacity-80"
          to="/"
        >
          Home
        </Link>
      </div>
    </div>
  );
}

export default function NotFound() {
  return <NotFoundHero />;
}
