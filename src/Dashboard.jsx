import './App.css'
import { useState, useEffect } from 'react'
import { db } from "./firebase"
import { doc, getDoc } from "firebase/firestore"

import Grafico from './Grafico'
import Header from './Header'
import CardResumo from './CardResumo'
import Extrato from './Extrato'
import Perfil from './Perfil'

function Dashboard({ sair, usuario }) {
  const [pagina, setPagina] = useState('dashboard')
  const [dadosCliente, setDadosCliente] = useState(null)

  useEffect(() => {
    async function buscarCliente() {
      if (!usuario) return

      let idCliente = ""
      if (usuario.email.includes("matheus")) idCliente = "Matheus Yuri"
      if (usuario.email.includes("emilly")) idCliente = "Emilly Micheluzzi"
      if (usuario.email.includes("igor")) idCliente = "Igor de Barros Justen"
      if (usuario.email.includes("alecansi")) idCliente = "Ale Cansi"
      if (usuario.email.includes("umaconta")) idCliente = "Daiana Nunes"
      if (usuario.email.includes("danibagattini")) idCliente = "Daniela Bagattini"

      const referencia = doc(db, "clientes", idCliente)
      const resultado = await getDoc(referencia)

      if (resultado.exists()) {
        setDadosCliente(resultado.data())
      }
    }

    buscarCliente()
  }, [usuario])

  function mostrarPagina() {
    if (pagina === 'extrato') return <Extrato />
    if (pagina === 'perfil') return <Perfil dadosCliente={dadosCliente} usuario={usuario} />

    // Página principal (Dashboard)
    const patrimonio = dadosCliente?.Patrimônio || 0
    const disponivel = dadosCliente?.Disponível || 0
    const saldoInicial = dadosCliente?.SaldoInicial || 0
    const rentabilidade = saldoInicial
      ? (((patrimonio - saldoInicial) / saldoInicial) * 100).toFixed(2)
      : 0

    return (
      <>
        <Header nome={dadosCliente?.nome} />

        <div className="cards">
          <div className="card-resumo">
            <div className="icone">💰</div>
            <p>Patrimônio Atual</p>
            <h2>R$ {patrimonio.toLocaleString('pt-BR')},00</h2>
            <span>Total acumulado</span>
          </div>

          <div className="card-resumo">
            <div className="icone">💵</div>
            <p>Saldo Inicial</p>
            <h2>R$ {saldoInicial.toLocaleString('pt-BR')},00</h2>
            <span>Valor de entrada</span>
          </div>

          <div className="card-resumo">
            <div className="icone">📈</div>
            <p>Rentabilidade</p>
            <h2>{rentabilidade}%</h2>
            <span>Comparado ao saldo inicial</span>
          </div>

          <div className="card-resumo">
            <div className="icone">💳</div>
            <p>Disponível</p>
            <h2>R$ {disponivel.toLocaleString('pt-BR')},00</h2>
            <span>Saldo livre</span>
          </div>
        </div>

        <h2 className="titulo">Evolução do patrimônio</h2>
        <div className="box">
          <Grafico />
        </div>
      </>
    )
  }

  return (
    <div className="dashboard">
      <aside className="menu">
        <h2>Justen BC</h2>
        <button onClick={() => setPagina('dashboard')}>Dashboard</button>
        <button onClick={() => setPagina('extrato')}>Extrato</button>
        <button onClick={() => setPagina('perfil')}>Perfil</button>
        <button onClick={sair}>🚪 Sair</button>
      </aside>

      <main className="conteudo">{mostrarPagina()}</main>
    </div>
  )
}

export default Dashboard
