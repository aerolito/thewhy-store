export default function HowThisWorks() {
  return (
    <div className="min-h-screen text-center flex flex-col justify-center items-center gap-20 my-20">
      <section className="flex flex-col md:flex-row items-center md:items-start md:h-[350px] gap-20 md:gap-0 justify-center text-justify">
        <div className=" w-[90%] md:w-1/2">
          <h2 className="leading-[15px] text-principal text-subtitleMobile md:text-subtitle font-bold mb-10">
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

        <img
          src="/howfoto.jpg"
          className="w-[90%] max-w-[450px] h-[350px] md:pl-[2rem]"
        />
      </section>
      <section className="flex flex-col-reverse md:flex-row items-center md:items-start d:items-start gap-20 md:gap-0 justify-center text-justify">
        <img
          src="/misfoto.jpeg"
          className="w-[90%] max-w-[450px] h-[350px] md:pr-[2rem]"
        />

        <div className=" w-[90%] md:w-1/2">
          <h2 className="leading-[15px] text-principal text-subtitleMobile md:text-subtitle font-bold mb-10">
            nossa missão
          </h2>
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
