import './App.css'
import { useState, useEffect } from 'react'
import { db } from "./firebase"
import { doc, getDoc } from "firebase/firestore"
import Header from './Header'
import Extrato from './Extrato'
import Perfil from './Perfil'

function calcularRentabilidade(inicial, atual) {
  if (!inicial || inicial === 0) return 0;
  return (((atual - inicial) / inicial) * 100).toFixed(2);
}

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
    const saldoInicial = dadosCliente?.SaldoInicial || 0
    const patrimonio = dadosCliente?.Patrimônio || 0
    const disponivel = dadosCliente?.Disponível || 0
    const rentabilidade = calcularRentabilidade(saldoInicial, patrimonio)

    return (
      <>
        <Header nome={dadosCliente?.nome} />

        <div className="painel">
          <div className="box">
            <h3>Patrimônio Atual</h3>
            <h2>R$ {patrimonio.toLocaleString('pt-BR')}</h2>
          </div>

          <div className="box">
            <h3>Saldo Inicial</h3>
            <h2>R$ {saldoInicial.toLocaleString('pt-BR')}</h2>
          </div>

          <div className="box">
            <h3>Disponível</h3>
            <h2>R$ {disponivel.toLocaleString('pt-BR')}</h2>
          </div>

          <div className="box">
            <h3>Rentabilidade</h3>
            <h2>{rentabilidade}%</h2>
          </div>
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
