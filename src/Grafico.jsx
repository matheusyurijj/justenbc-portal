import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

function Grafico({ valorInicial, valorAtual }) {
  // Monta os dados só com o início e o estado atual
  const dados = [
    { etapa: 'Inicial', valor: valorInicial },
    { etapa: 'Atual', valor: valorAtual }
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={dados}>
        <XAxis dataKey="etapa" stroke="#777" />
        <YAxis stroke="#777" />
        <Tooltip
          contentStyle={{
            background: "#151515",
            border: "1px solid #d4af37",
            color: "white"
          }}
        />
        <Line
          type="monotone"
          dataKey="valor"
          stroke="#d4af37"
          strokeWidth={3}
          dot={{ fill:"#d4af37" }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Grafico
