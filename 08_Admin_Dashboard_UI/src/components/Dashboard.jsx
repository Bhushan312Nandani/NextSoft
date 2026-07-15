import { Users, DollarSign, Activity, TrendingUp } from 'lucide-react';
import MetricCard from './MetricCard';
import SalesChart from './SalesChart';

export default function Dashboard() {
  return (
    <div>
      <div className="metrics-grid">
        <MetricCard 
          title="Total Revenue" 
          value="$45,231.89" 
          icon={<DollarSign size={24} />} 
          color="#10b981" 
          bgColor="rgba(16, 185, 129, 0.1)" 
        />
        <MetricCard 
          title="Active Users" 
          value="2,340" 
          icon={<Users size={24} />} 
          color="#3b82f6" 
          bgColor="rgba(59, 130, 246, 0.1)" 
        />
        <MetricCard 
          title="Conversion Rate" 
          value="3.2%" 
          icon={<Activity size={24} />} 
          color="#8b5cf6" 
          bgColor="rgba(139, 92, 246, 0.1)" 
        />
        <MetricCard 
          title="Growth" 
          value="+12.5%" 
          icon={<TrendingUp size={24} />} 
          color="#f59e0b" 
          bgColor="rgba(245, 158, 11, 0.1)" 
        />
      </div>

      <div className="charts-grid">
        <SalesChart />
        <div className="chart-card">
          <h3 className="chart-header">Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[1,2,3,4,5].map(i => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--border-color)' }}></div>
                <div>
                  <p style={{ fontWeight: '500', fontSize: '0.875rem' }}>User #{1000 + i} made a purchase</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{i * 2} hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
