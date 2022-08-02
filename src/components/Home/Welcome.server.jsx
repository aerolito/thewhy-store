import {Link} from '@shopify/hydrogen';

export default function Welcome() {
  return (
    <div className="z-1 h-[calc(100vh-60px)] md:h-[calc(100vh-80px)] text-center flex flex-col justify-around items-center gap-8 py-20">
      <div className="flex flex-col gap-8 items-center">
        <h1 className="md:leading-[55px] font-bold text-principal text-subtitleMobile md:text-title">
          COMPRE MENOS, <br /> ESCOLHA MELHOR
        </h1>
        <p className="text-principal text-text">
          The Why Store é uma plataforma de curadoria <br /> especializada em
          marcas que juntam design, moda e <br /> consumo consciente. Navegue e
          experimente uma <br /> nova forma de comprar.
        </p>
        <Link
          to="/missao"
          className="rounded-full text-[14px] bg-principal p-2 px-[30px] text-white hover:opacity-80"
        >
          Saiba mais
        </Link>
      </div>
      <a href="#searcher">
        <img
          src="/arrow-down.svg"
          width="52px"
          height="17px"
          className="mt-8 md:mt-20 hover:opacity-80 cursor-pointer"
        />
      </a>
    </div>
  );
}
