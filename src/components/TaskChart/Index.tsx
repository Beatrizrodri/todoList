import './style.css'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

interface TaskChartProps {
  completed: number
  active: number
  deleted: number
}

const COLORS = ['#75a784', '#8b9dd8']

export function TaskChart({ completed, active }: TaskChartProps) {
  const data = [
    { name: 'Concluídas', value: completed },
    { name: 'Ativas', value: active }
  ]

  return (
    <div className="chart-content">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            label
          >
            {data.map((_, index) => (
              <Cell
                className="chart-description"
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
