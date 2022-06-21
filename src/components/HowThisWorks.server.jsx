export default function HowThisWorks() {
  return (
    <div className="min-h-screen text-center flex flex-col justify-center items-center gap-20 my-20">
      <section className="flex flex-col md:flex-row items-center md:items-start  justify-center gap-20 text-center md:text-left">
        <div className="w-1/2">
          <h2 className="text-principal text-subtitleMobile md:text-subtitle font-bold mb-12">
            como funciona
          </h2>
          <p className="text-lg font-medium mb-8 leading-6">
            The Why Store é um espaço que conecta moda, design e consumo
            consciente. Assim que escolher seus produtos, a TWS o encaminha para
            o site de origem da marca, onde você pode finalizar o processo.
          </p>
          <p className="text-lg font-medium mb-8 leading-6">
            Mas a TWS vai muito além de uma curadoria de marcas. Ela é, acima de
            tudo, uma plataforma que o ajuda a refletir sobre os seus hábitos de
            consumo. Navegando pela plataforma, você será conduzido a pensar
            sobre o que compra e sobre como comprar.
          </p>
        </div>

        <img src="/howfoto.jpg" className="w-[90%] max-w-[450px] h-[350px]" />
      </section>
      <section className="flex flex-col-reverse md:flex-row items-center md:items-start d:items-start justify-center gap-20 text-center md:text-left">
        <img src="/misfoto.jpeg" className="w-[90%] max-w-[450px] h-[350px]" />

        <div className="w-1/2">
          <h2 className="text-principal text-subtitleMobile md:text-subtitle font-bold mb-12">
            nossa missão
          </h2>
          <p className="text-lg font-medium mb-8 leading-6">
            A The Why Store nasceu em cima de pelo menos duas crenças:
          </p>
          <p className="text-lg font-medium mb-8 leading-6">
            1) Para nós, uma roupa bonita não está autorizada a causar danos ao
            planeta. Assim como uma roupa sustentável não tem que,
            necessariamente, abrir mão da parte estética.
          </p>
          <p className="text-lg font-medium mb-8 leading-6">
            2) Consumo e consumismo são coisas diferentes. Por isso, experiência
            de compra na TWS é diferente do tradicional. Queremos provocar
            aprendizado e reflexão. Inclusive é este o motivo do ‘Why’ no nosso
            nome. Queremos que você crie o hábito de se perguntar: ‘Por que
            estou comprando o que estou comprando?’
          </p>
        </div>
      </section>
    </div>
  );
}