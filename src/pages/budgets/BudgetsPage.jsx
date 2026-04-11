import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import FeatureHeader from '@/components/commonUI/FeatureHeader';
import ChartsCarousel from '@/components/commonUI/ChartsCarousel';
import TransactionTableMini from '@/components/commonUI/TransactionTableMini';
import budgetService from '@/services/budgetService/budgetService';
import Loader from '@/components/commonUI/Loader';
import { PieChart, Wallet, Calendar, Plus, Filter, ArrowUpRight } from 'lucide-react';
import { 
  PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const COLORS = ['#818cf8', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#8b5cf6'];

const BudgetsPage = () => {
  const [budgets, setBudgets] = useState([]);
  const [analytics, setAnalytics] = useState({ distribution: [], trend: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [budgetsData, analyticsData] = await Promise.all([
          budgetService.getBudgets(),
          budgetService.getBudgetAnalytics()
        ]);
        setBudgets(budgetsData);
        setAnalytics(analyticsData);
      } catch (error) {
        console.error("Failed to load budgets data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const headerActions = [
    { label: 'Set Budget', variant: 'primary', icon: Plus, onClick: () => alert('Set Budget Clicked') },
    { label: 'Add Category', variant: 'secondary', icon: Filter, onClick: () => alert('Add Category Clicked') },
    { label: 'History', variant: 'secondary', icon: Calendar, onClick: () => alert('History Clicked') },
  ];

  if (isLoading) return <AppLayout><div className="h-[80vh] flex items-center justify-center"><Loader text="Analyzing your budget limits..." /></div></AppLayout>;

  return (
    <AppLayout>
      <div className="space-y-10 pb-20">
        <FeatureHeader 
          title="Monthly Budgets" 
          description="Manage your spending limits and optimize distributions."
          actions={headerActions}
        />

        {/* Analytics Section */}
        <ChartsCarousel title="Budget Analytics" subtitle="Where your money goes">
          {/* Slide 1: Category Distribution */}
          <div className="w-full h-full">
            <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
              <PieChart className="h-4 w-4 text-primary" /> Spending Distribution
            </h4>
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={analytics.distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {analytics.distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', fontSize: '10px' }}
                />
              </RePieChart>
            </ResponsiveContainer>
          </div>

          {/* Slide 2: Weekly Limit Trend */}
          <div className="w-full h-full">
            <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
              <Wallet className="h-4 w-4 text-emerald-500" /> Spend vs Budget Trend
            </h4>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#ffffff05'}}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="spent" fill="#818cf8" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="budget" fill="#ffffff10" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartsCarousel>

        {/* Budget Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget, idx) => {
            const progress = (budget.spent / budget.limit) * 100;
            const isOverBudget = progress > 100;
            
            return (
              <motion.div
                key={budget.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "p-6 rounded-[32px] bg-card border transition-all duration-500",
                  isOverBudget ? "border-rose-500/30" : "border-border/50 hover:border-primary/50"
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("p-3 rounded-2xl", budget.color + "/10", "text-" + budget.color.split('-')[1] + "-500")}>
                    <Wallet className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-border/50">
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      isOverBudget ? "bg-rose-500 animate-pulse" : "bg-emerald-500"
                    )} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      {isOverBudget ? 'Exceeded' : 'On Track'}
                    </span>
                  </div>
                </div>

                <h4 className="text-lg font-black tracking-tight mb-1">{budget.name}</h4>
                <div className="flex justify-between items-baseline mb-6">
                   <p className="text-2xl font-black font-mono tracking-tighter">
                    ₹ {budget.spent.toLocaleString('en-IN')}
                   </p>
                   <p className="text-xs font-bold text-muted-foreground">
                    of ₹ {budget.limit.toLocaleString('en-IN')}
                   </p>
                </div>

                <div className="space-y-4">
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(progress, 100)}%` }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        isOverBudget ? "bg-rose-500" : budget.color
                      )}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    <span>Utilization</span>
                    <span className={isOverBudget ? "text-rose-500" : "text-primary"}>{Math.round(progress)}%</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Recent Budget Transactions */}
        <TransactionTableMini 
          transactions={[]} // Using an empty list for now to show the "No records" state
          title="Recent Budget Adjustments"
          subtitle="Direct categorization of daily spends"
        />
      </div>
    </AppLayout>
  );
};

export default BudgetsPage;
