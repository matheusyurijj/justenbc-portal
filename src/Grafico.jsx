import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'


function Grafico() {


  const dados = [

    {
      mes: 'Jan',
      valor: 150000
    },

    {
      mes: 'Fev',
      valor: 170000
    },

    {
      mes: 'Mar',
      valor: 200000
    },

    {
      mes: 'Abr',
      valor: 230000
    },

    {
      mes: 'Mai',
      valor: 250000
    }

  ]



  return (

    <ResponsiveContainer width="100%" height={300}>


      <LineChart data={dados}>


        <XAxis 
          dataKey="mes"
          stroke="#777"
        />


        <YAxis
          stroke="#777"
        />


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

          dot={{
            fill:"#d4af37"
          }}

        />


      </LineChart>


    </ResponsiveContainer>

  )

}


export default Grafico