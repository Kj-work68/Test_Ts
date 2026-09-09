import React, {useState} from 'react'

interface WidgetData {
  id: number;
  title: string;
  value: string | number;
  isPositive?: boolean;
}

interface StatCardProps {
  data: WidgetData
  onRefresh: (id: number) => void
}

const StatCard: React.FC<StatCardProps> = ({ data, onRefresh}) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '8px' }}>
      <h4>{data.title}</h4>
      <p style={{ fontSize: '18px', color: data.isPositive ? 'green' : 'red' }}>
        {data.value}
      </p>
      <button onClick={() => onRefresh(data.id)}>Refresh</button>
    </div>
  );
}


function dashboard() {
  const [stats, setStats] = useState<WidgetData[]>([
    { id: 1, title: 'Total Revenue', value: '$12,450', isPositive: true },
    { id: 2, title: 'Active Users', value: 1280, isPositive: true },
    { id: 3, title: 'Bounce Rate', value: '42%', isPositive: false },
  ]);

  const handleRefresh = (id: number): void => {
    console.log(`Refreshed widget ID: ${id}`);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('Search value:', event.target.value);
  };
  return (
   <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Dashboard Page</h1>
      
      {/* Event handling บน JSX พร้อม Type checking */}
      <input 
        type="text" 
        placeholder="Search..." 
        onChange={handleSearch} 
        style={{ marginBottom: '16px', padding: '6px' }}
      />

      <div style={{ display: 'flex', gap: '16px' }}>
        {/* Render รายการตาม Type ที่ระบุไว้ */}
        {stats.map((stat) => (
          <StatCard key={stat.id} data={stat} onRefresh={handleRefresh} />
        ))}
      </div>
    </div>
  )
}

export default dashboard