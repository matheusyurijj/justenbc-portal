function CardResumo({ titulo, valor, icone }) {

  return (

    <div className="card-resumo">


      <div className="icone">

        {icone}

      </div>



      <p>
        {titulo}
      </p>



      <h2>
        {valor}
      </h2>



      <span>
        Atualizado hoje
      </span>


    </div>

  )

}


export default CardResumo