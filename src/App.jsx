import './App.css'
import { useState } from 'react'

import Dashboard from './Dashboard'


function App() {


  const [logado, setLogado] = useState(false)



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
          placeholder="E-mail ou CPF"
        />



        <input
          type="password"
          placeholder="Senha"
        />



        <button onClick={() => setLogado(true)}>
          Entrar
        </button>



      </div>


    </div>

  )

}


export default App