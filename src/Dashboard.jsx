import './App.css'
import { useState, useEffect } from 'react'

import { db } from "./firebase"
import { doc, getDoc } from "firebase/firestore"

import Grafico from './Grafico'
import Header from './Header'
import CardResumo from './CardResumo'

import Investimentos from './Investimentos'
import Extrato from './Extrato'
import Perfil from './Perfil'

function Dashboard({ sair, usuario }) {

  const [pagina, setPagina] = useState('dashboard')
  const [dadosCliente, setDadosCliente] = useState(null)

  useEffect(() => {

    async function buscarCliente() {

      if (!usuario) return

      let idCliente = ""

      if (usuario.email.includes("matheus")) {
        idCliente = "Matheus Yuri"
      }

      if (usuario.email.includes("emilly")) {
        idCliente = "Emilly Micheluzzi"
      }

      if (usuario.email.includes("igor")) {
        idCliente = "Igor de Barros Justen"
      }

      if (usuario.email.includes("alecansi")) {
        idCliente = "Ale Cansi"
      }

      if (usuario.email.includes("umaconta")) {
        idCliente = "Daiana Nunes"
      }

      if (usuario.email.includes("danibagattini")) {
        idCliente = "Daniela Bagattini"
      }

      const referencia = doc(
        db,
        "clientes",
        idCliente
      )

      const resultado = await getDoc(referencia)

      if (resultado.exists()) {
        setDadosCliente(resultado.data())
      }

    }

    buscarCliente()

  }, [usuario])



  function mostrarPagina() {

    if (pagina === 'investimentos') {
      return <Investimentos />
    }

    if (pagina === 'extrato') {
      return <Extrato />
    }

    if (pagina === 'perfil') {
      return (
        <Perfil
          dadosCliente={dadosCliente}
          usuario={usuario}
        />
      )
    }

    return (
      <>

        <Header nome={dadosCliente?.nome} />

        <div className="cards">

          <CardResumo
            icone="💰"
            titulo="Patrimônio Total"
            valor={
              dadosCliente
                ? `R$ ${dadosCliente.Patrimônio.toLocaleString('pt-BR')},00`
                : "Carregando..."
            }
          />

          <CardResumo
            icone="📈"
            titulo="Rentabilidade"
            valor={
              dadosCliente?.Rentabilidade
                ? `${dadosCliente.Rentabilidade}% ao mês`
                : "Sem dados"
            }
          />

          <CardResumo
            icone="💵"
            titulo="Disponível"
            valor={
              dadosCliente?.Disponível
                ? `R$ ${dadosCliente.Disponível.toLocaleString('pt-BR')},00`
                : "R$ 0,00"
            }
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
          Justen BC
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