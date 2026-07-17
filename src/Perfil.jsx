import './App.css'


function Perfil({ dadosCliente, usuario }) {

  return (

    <div className="conteudo">


      <h1>
        Meu Perfil 👤
      </h1>


      <p>
        Informações da conta
      </p>



      <div className="box">


        <h3>
          Nome
        </h3>

        <p>
          {dadosCliente?.nome || "Carregando..."}
        </p>



        <hr />



        <h3>
          E-mail
        </h3>

        <p>
          {usuario?.email || "Carregando..."}
        </p>



        <hr />



        <h3>
          Tipo de cliente
        </h3>

        <p>
          Investidor Premium
        </p>



        <hr />



        <h3>
          Patrimônio
        </h3>

        <p>
          {dadosCliente
            ? `R$ ${dadosCliente.Patrimônio.toLocaleString('pt-BR')},00`
            : "Carregando..."}
        </p>



        <hr />



        <h3>
          Saldo disponível
        </h3>

        <p>
          {dadosCliente
            ? `R$ ${dadosCliente.Disponível.toLocaleString('pt-BR')},00`
            : "Carregando..."}
        </p>



        <hr />



        <h3>
          Rentabilidade
        </h3>

        <p>
          {dadosCliente?.Rentabilidade || "0"}% ao mês
        </p>



      </div>



    </div>

  )

}


export default Perfil