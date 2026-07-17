function Header({ nome }) {


  return (

    <header className="header">


      <h2>
        Olá, {nome || "Cliente"}
      </h2>


      <p>
        Bem-vindo ao seu painel Justen BC
      </p>


    </header>

  )

}


export default Header