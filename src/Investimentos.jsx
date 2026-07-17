import './App.css'


function Investimentos() {

  return (

    <div className="conteudo">


      <h1>
        Meus Investimentos 📈
      </h1>


      <p>
        Confira sua carteira atual
      </p>



      <div className="investimentos">


        <div className="box">

          <h3>
            Renda Fixa
          </h3>

          <h2>
            R$ 100.000,00
          </h2>

          <p>
            CDB 110% CDI
          </p>

        </div>




        <div className="box">

          <h3>
            Fundos Imobiliários
          </h3>

          <h2>
            R$ 80.000,00
          </h2>

          <p>
            Dividendos mensais
          </p>

        </div>





        <div className="box">

          <h3>
            Ações
          </h3>

          <h2>
            R$ 70.000,00
          </h2>

          <p>
            Bolsa brasileira
          </p>

        </div>



      </div>



    </div>

  )

}


export default Investimentos