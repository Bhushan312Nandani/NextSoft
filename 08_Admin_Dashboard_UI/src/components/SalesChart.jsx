import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', sales: 4000, visitors: 2400 },
  { name: 'Feb', sales: 3000, visitors: 1398 },
  { name: 'Mar', sales: 2000, visitors: 9800 },
  { name: 'Apr', sales: 2780, visitors: 3908 },
  { name: 'May', sales: 1890, visitors: 4800 },
  { name: 'Jun', sales: 2390, visitors: 3800 },
  { name: 'Jul', sales: 3490, visitors: 4300 },
];

export default function SalesChart() {
  return (
    <div className="chart-card">
      <h3 className="chart-header">Sales Overview</h3>
      <div style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
            <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
            <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              itemStyle={{ color: 'var(--primary-color)' }}
            />
            <Line type="monotone" dataKey="sales" stroke="var(--primary-color)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
