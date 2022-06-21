import {BackButton} from '../components/BackButton.client';
import {Slogan} from '../components/Slogan.server';

export default function MissionPage() {
  return (
    <>
      <Slogan />
      <div className="text-text text-principal flex flex-col gap-12 max-w-[770px] md:mt-[-20px] m-auto w-full">
        <h2 className="text-principal font-bold text-subtitle text-center">
          missão
        </h2>
        <p className="md:mt-[-20px]">
          O ano de 2020 fez o e-commerce explodir. Nesse período, o Brasil
          ganhou cerca de dez milhões de novos compradores online. Dados do
          Google mostram que houve crescimento de 112% nos pedidosde compras
          virtuais e 104% no faturamento total do comércio eletrônico nacional.
        </p>
        <p>
          Um novo cenário que pode ser celebrado do ponto de vista de
          transformação digital, mas que cobrouum preço. O aumento do consumo
          digital fez aumentar, também, o consumismo digital.
        </p>
        <p>
          Este fenômeno não passou despercebido pela Aerolito. E assim nasceu a
          The Why Store. Uma loja virtual que não é apenas uma loja virtual. Mas
          uma plataforma que, acima de tudo, tem como missão ajudar a sociedade
          a refletir sobre consumo consciente.
        </p>
        <p>
          Tudo começou com a Aerolito (uma iniciante no assunto 'consumo
          consciente') fazendo o seu dever de casa. Fomos consultar
          especialistas para tentar chegar a um conceito definitivo, que
          orientasse todo o nosso trabalho a partir daí.
        </p>
        <p>
          Mas, ao longo dessa jornada, descobrimos que não havia um consenso
          entre os/as especialistas. Algumas pessoas acreditavam que consumo
          consciente era simplesmente comprar menos. Outras defendiam que o
          consumo consciente passava, necessariamente, pelo uso de insumos
          veganos. Um terceiro grupo levantava a bandeira de que só existia
          consumo consciente com upcycling no processo. Em certas conversas,
          havia gente que só aceitava o uso do termo se houvesse grupos
          minorizados na equação. Para determinadas figuras, a condição número
          um era produção local.
        </p>
        <p> Nos vimos num beco sem saída.</p>
        <p>
          Mas foi justamente aí que o projeto começou a nascer de verdade. Nosso
          maior problema se transformou, rapidamente, na nossa grande solução.
          Veja: exatamente pela falta de consenso, ficou claro que a plataforma
          deveria ser construída sem um conceito definitivo. Pelo contrário:
          quanto mais aberta fosse, mais ela daria espaço para que as pessoas se
          perguntassem:
        </p>
        <p className=" mt-[2rem] mb-[4rem]">
          'afinal, o que é consumo consciente para mim'
        </p>
      </div>
    </>
  );
}
