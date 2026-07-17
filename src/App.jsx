import './App.css'
import { useState } from 'react'

import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebase"

import Dashboard from './Dashboard'


function App() {


  const [logado, setLogado] = useState(false)

  const [usuario, setUsuario] = useState(null)

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const [erro, setErro] = useState("")



  async function entrar() {

    try {

      const resultado = await signInWithEmailAndPassword(
        auth,
        email,
        senha
      )


      setUsuario(resultado.user)

      setLogado(true)

      setErro("")


    } catch {

      setErro("E-mail ou senha incorretos")

    }

  }




  if (logado) {

    return (

      <Dashboard
        usuario={usuario}
        sair={() => setLogado(false)}
      />

    )

  }




  return (

    <div className="container">


      <div className="card">


        <h1>
          Justen BC
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