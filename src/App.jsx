import './App.css'
import { useState } from 'react'

import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebase"

import Dashboard from './Dashboard'


function App() {

  const [logado, setLogado] = useState(false)

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const [erro, setErro] = useState("")


  async function entrar() {

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        senha
      )


      setLogado(true)
      setErro("")


    } catch (error) {

      setErro("E-mail ou senha incorretos")

    }

  }



  if (logado) {

    return (

      <Dashboard
        sair={() => setLogado(false)}
      />

    )

  }



  return (

    <div className="container">

      <div className="card">


        <h1>
          Portal Invest
        </h1>


        <p>
          Seu patrimônio em um só lugar
        </p>



        <input

          placeholder="E-mail"

          value={email}

          onChange={(e)=>setEmail(e.target.value)}

        />



        <input

          type="password"

          placeholder="Senha"

          value={senha}

          onChange={(e)=>setSenha(e.target.value)}

        />



        <button onClick={entrar}>

          Entrar

        </button>



        {erro && (

          <p>
            {erro}
          </p>

        )}



      </div>

    </div>

  )

}


export default App