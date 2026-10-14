import './App.css'
import { useState, useEffect } from 'react'
import { db } from "./firebase"
import { doc, getDoc } from "firebase/firestore"

import Grafico from './Grafico'
import Header from './Header'
import Extrato from './Extrato'
import Perfil from './Perfil'

function Dashboard({ sair, usuario }) {
  const [pagina, setPagina] = useState('dashboard')
  const [dadosCliente, setDadosCliente] = useState(null)
  const [erro, setErro] = useState('')

  useEffect(() => {
    let ativo = true

    async function buscarCliente() {
      setDadosCliente(null)
      setErro('')

      if (!usuario?.email) return

      const email = usuario.email.toLowerCase()

      const clientes = {
        matheus: 'Matheus Yuri',
        emilly: 'Emilly Micheluzzi',
        igor: 'Igor de Barros Justen',
        alecansi: 'Ale Cansi',
        umaconta: 'Daiana Nunes',
        danibagattini: 'Daniela Bagattini',
        danii_sell: 'Daniela Sell',
        taylanam6: 'Taylana Martins'
      }

      const identificador = Object.keys(clientes).find(chave =>
        email.includes(chave)
      )

      if (!identificador) {
        if (ativo) setErro('Não foi possível identificar este cliente.')
        return
      }

      const idCliente = clientes[identificador]

      try {
        const referencia = doc(db, 'clientes', idCliente)
        const resultado = await getDoc(referencia)

        if (!ativo) return

        if (resultado.exists()) {
          setDadosCliente(resultado.data())
        } else {
          setErro(`Documento "${idCliente}" não encontrado no Firestore.`)
        }
      } catch (e) {
        console.error('Erro ao buscar cliente:', e)
        if (ativo) {
          setErro('Erro ao carregar os dados. Confira a conexão e as permissões do Firebase.')
        }
      }
    }

    buscarCliente()

    return () => {
      ativo = false
    }
  }, [usuario])

  function obterCampo(dados, nome) {
    const entrada = Object.entries(dados || {}).find(
      ([chave]) => chave.trim() === nome
    )

    return entrada ? entrada[1] : 0
  }

  function mostrarPagina() {
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

    const patrimonio = Number(obterCampo(dadosCliente, 'Patrimônio')) || 0
    const disponivel = Number(obterCampo(dadosCliente, 'Disponível')) || 0
    const saldoInicial = Number(obterCampo(dadosCliente, 'SaldoInicial')) || 0

    const rentabilidade = saldoInicial
      ? (((patrimonio - saldoInicial) / saldoInicial) * 100).toFixed(2)
      : 0

    return (
      <>
        <Header nome={dadosCliente?.nome} />

        {erro && <p>{erro}</p>}

        {!dadosCliente && !erro && <p>Carregando dados...</p>}

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

        <button onClick={() => setPagina('dashboard')}>
          Dashboard
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