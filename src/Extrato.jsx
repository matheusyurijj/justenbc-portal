import './App.css'


function Extrato() {

  return (

    <div className="conteudo">


      <h1>
        Extrato Financeiro 📄
      </h1>


      <p>
        Últimas movimentações da conta
      </p>




      <div className="box">


        <p>
          📥 16/07/2026 - Aporte realizado
          <br />
          + R$ 5.000,00
        </p>


        <hr />


        <p>
          📈 15/07/2026 - Rendimentos
          <br />
          + R$ 850,00
        </p>


        <hr />


        <p>
          💳 10/07/2026 - Taxa administrativa
          <br />
          - R$ 300,00
        </p>


        <hr />


        <p>
          📥 05/07/2026 - Novo investimento
          <br />
          + R$ 10.000,00
        </p>



      </div>



    </div>

  )

}


export default Extrato