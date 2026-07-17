import './App.css'
import { useState } from 'react'

import Grafico from './Grafico'
import Header from './Header'
import CardResumo from './CardResumo'

import Investimentos from './Investimentos'
import Extrato from './Extrato'
import Perfil from './Perfil'


function Dashboard({ sair }) {


  const [pagina, setPagina] = useState('dashboard')



  function mostrarPagina() {


    if (pagina === 'investimentos') {
      return <Investimentos />
    }


    if (pagina === 'extrato') {
      return <Extrato />
    }


    if (pagina === 'perfil') {
      return <Perfil />
    }



    return (

      <>


        <Header />


        <div className="cards">


          <CardResumo
            icone="💰"
            titulo="Patrimônio Total"
            valor="R$ 2.250.000,00"
          />



          <CardResumo
            icone="📈"
            titulo="Rentabilidade"
            valor="+1,20% ao mês"
          />



          <CardResumo
            icone="💵"
            titulo="Disponível"
            valor="R$ 15.000,00"
          />


        </div>



        <h2 className="titulo">
          Evolução do patrimônio
        </h2>



        <div className="box">

          <Grafico />

        </div>


      </>

    )

  }




  return (

    <div className="dashboard">


      <aside className="menu">


        <h2>
          Portal Invest
        </h2>



        <button onClick={() => setPagina('dashboard')}>
          Dashboard
        </button>



        <button onClick={() => setPagina('investimentos')}>
          Investimentos
        </button>



        <button onClick={() => setPagina('extrato')}>
          Extrato
        </button>



        <button onClick={() => setPagina('perfil')}>
          Perfil
        </button>



        <button onClick={sair}>
          🚪 Sair
        </button>



      </aside>




      <main className="conteudo">


        {mostrarPagina()}


      </main>



    </div>

  )

}


export default Dashboard