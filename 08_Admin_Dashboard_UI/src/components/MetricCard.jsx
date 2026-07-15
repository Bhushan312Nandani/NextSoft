export default function MetricCard({ title, value, icon, color, bgColor }) {
  return (
    <div className="metric-card">
      <div className="metric-info">
        <h3>{title}</h3>
        <div className="value">{value}</div>
      </div>
      <div className="metric-icon" style={{ backgroundColor: bgColor, color: color }}>
        {icon}
      </div>
    </div>
  );
}
