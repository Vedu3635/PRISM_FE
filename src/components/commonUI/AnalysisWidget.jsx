import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Maximize2, RefreshCw, MoreVertical, 
  BarChart3, PieChart as PieChartIcon, LineChart, AreaChart as AreaChartIcon,
  TrendingUp, AlertCircle
} from 'lucide-react';
import { 
  BarChart, Bar, PieChart, Pie, LineChart as ReLineChart, Line, 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { cn } from '@/utils/cn';
import analyticsService from '@/services/analyticsService/analyticsService';

const AnalysisWidget = ({ id, title, type, onRemove }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await analyticsService.getAnalysisData(id);
      setData(result);
    } catch (err) {
      console.error("Widget Data Fetch Error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const renderChart = () => {
    if (loading) return <div className="h-full flex items-center justify-center"><RefreshCw className="h-6 w-6 text-primary animate-spin" /></div>;
    if (error || data.length === 0) return (
      <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-2">
        <AlertCircle className="h-8 w-8 opacity-20" />
        <p className="text-[10px] uppercase font-black tracking-widest">No data available</p>
      </div>
    );

    switch (type) {
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || '#818cf8'} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border)/0.5)', borderRadius: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <ReLineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip 
                 contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border)/0.5)', borderRadius: '12px' }}
              />
              <Line type="monotone" dataKey="amount" stroke="#818cf8" strokeWidth={3} dot={{ r: 4, fill: '#818cf8' }} activeDot={{ r: 6 }} />
            </ReLineChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="amount" stroke="#34d399" fillOpacity={1} fill="url(#colorAmount)" />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="category" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="budget" fill="rgba(255,255,255,0.05)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="actual" fill="#fbbf24" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group relative p-6 rounded-[32px] bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 overflow-hidden h-[360px] flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-black tracking-tight">{title}</h3>
          <div className="flex items-center gap-2 mt-1">
             <TrendingUp className="h-3 w-3 text-emerald-500" />
             <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Real-time Analysis</span>
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={fetchData} 
            className="p-2 rounded-xl hover:bg-white/5 text-muted-foreground transition-all"
            title="Refresh"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button 
            onClick={onRemove} 
            className="p-2 rounded-xl hover:bg-destructive/10 text-destructive transition-all"
            title="Remove Widget"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 py-2">
        {renderChart()}
      </div>

      <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between">
         <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground">Source: Transaction Ledger</span>
         <MoreVertical className="h-4 w-4 text-muted-foreground/30" />
      </div>
    </motion.div>
  );
};

export default AnalysisWidget;
