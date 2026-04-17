import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import FeatureHeader from '@/components/commonUI/FeatureHeader';
import ChartsCarousel from '@/components/commonUI/ChartsCarousel';
import TransactionTableMini from '@/components/commonUI/TransactionTableMini';
import goalService from '@/services/goalService/goalService';
import Loader from '@/components/commonUI/Loader';
import { Target, TrendingUp, Calendar, Plus, Tag, PieChart as PieChartIcon } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { motion } from 'framer-motion';

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [goalsData, analyticsData, txData] = await Promise.all([
          goalService.getGoals(),
          goalService.getGoalAnalytics(),
          goalService.getGoalTransactions()
        ]);
        setGoals(goalsData);
        setAnalytics(analyticsData);
        setTransactions(txData);
      } catch (error) {
        console.error("Failed to load goals data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const headerActions = [
    { label: 'Add Goal', variant: 'primary', icon: Plus, onClick: () => alert('Add Goal Clicked') },
    { label: 'Add Category', variant: 'secondary', icon: Tag, onClick: () => alert('Add Category Clicked') },
    { label: 'Add Transaction', variant: 'secondary', icon: TrendingUp, onClick: () => alert('Add Transaction Clicked') },
  ];

  if (isLoading) return <AppLayout><div className="h-[80vh] flex items-center justify-center"><Loader text="Prism focusing on your goals..." /></div></AppLayout>;

  return (
    <AppLayout>
      <div className="space-y-10 pb-20">
        <FeatureHeader 
          title="Goals Dashboard" 
          description="Transform your aspirations into financial reality."
          actions={headerActions}
        />

        {/* Analytics Section with Carousel */}
        <ChartsCarousel title="Analytics Overview" subtitle="Tracking your performance">
          {/* Slide 1: Savings Trend */}
          <div className="w-full h-full">
            <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" /> Monthly Savings Momentum
            </h4>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics}>
                <defs>
                  <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="savings" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorSavings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Slide 2: Target Comparison */}
          <div className="w-full h-full">
            <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
              <PieChartIcon className="h-4 w-4 text-emerald-500" /> Savings vs Targets
            </h4>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#ffffff05'}}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="savings" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="target" fill="#ffffff10" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartsCarousel>

        {/* Goals Progress Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal, idx) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-[32px] bg-card border border-border/50 group hover:border-primary/50 transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-2xl ${goal.color}/10 text-${goal.color.split('-')[1]}-500 group-hover:scale-110 transition-transform`}>
                  <Target className="h-6 w-6" />
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-0.5">Deadline</span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(goal.deadline).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-black tracking-tight mb-2">{goal.name}</h3>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">
                ₹ {goal.current.toLocaleString('en-IN')} / ₹ {goal.target.toLocaleString('en-IN')}
              </p>

              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Progress</span>
                  <span className="text-lg font-black font-mono">{Math.round((goal.current / goal.target) * 100)}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className={`h-full ${goal.color} shadow-[0_0_15px_rgba(255,255,255,0.05)]`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transactions Section */}
        <TransactionTableMini 
          transactions={transactions} 
          title="Goal Specific History"
          subtitle="Direct deposits and growth tracking"
        />
      </div>
    </AppLayout>
  );
};

export default GoalsPage;
