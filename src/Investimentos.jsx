import './App.css'

function calcularRentabilidade(valorInicial, valorAtual) {
  return (((valorAtual - valorInicial) / valorInicial) * 100).toFixed(2);
}

export default function Investimentos({ dadosCliente }) {
  return (
    <div className="conteudo">
      <h1>Meus Investimentos 📈</h1>
      <p>Confira sua carteira atual</p>

      <div className="investimentos">
        {dadosCliente?.Investimentos?.map((item, index) => (
          <div key={index} className="box">
            <h3>{item.tipo}</h3>
            <h2>R$ {item.valoratual.toLocaleString('pt-BR')}</h2>
            <p>Rentabilidade: {calcularRentabilidade(item.valorinicial, item.valoratual)}%</p>
          </div>
        ))}
      </div>
    </div>
  )
}
