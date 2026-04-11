import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PieChart as PieChartIcon,
  Sparkles,
  ArrowRight,
  Plus
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import CashFlowWidget from '@/components/dashboard/CashFlowWidget';
import BudgetHealthWidget from '@/components/dashboard/BudgetHealthWidget';
import GoalsWidget from '@/components/dashboard/GoalsWidget';
import GroupSummaryWidget from '@/components/dashboard/GroupSummaryWidget';
import TransactionList from '@/components/dashboard/TransactionList';
import SmartInsights from '@/components/dashboard/SmartInsights';

const MOCK_DATA = {
  balance: 45230,
  income: 12000,
  expenses: 8000,
  savings: 4000,
  dailyAvg: 230,
  burnRate: 12,
  projection: 38500,
  owe: 1200,
  owed: 450,
  budgets: [
    { category: "Food", used: 4500, limit: 5000 },
    { category: "Travel", used: 7000, limit: 5000 },
    { category: "Shopping", used: 2000, limit: 4000 }
  ],
  goals: [
    { name: "Emergency Fund", current: 30000, target: 50000, color: "bg-primary" },
    { name: "New Laptop", current: 15000, target: 45000, color: "bg-purple-500" }
  ],
  groups: [
    { name: "Goa Trip", balance: -850 },
    { name: "Flat Rent", balance: 1200 }
  ],
  transactions: [
    { name: "Swiggy", amount: -450, category: "Food", date: "Today", tag: "High Spend" },
    { name: "Netflix", amount: -199, category: "Entertainment", date: "Yesterday", tag: "Recurring" },
    { name: "Freelance Payment", amount: 2500, category: "Income", date: "2 days ago", tag: null },
    { name: "Electricity Bill", amount: -1200, category: "Utilities", date: "3 days ago", tag: "Recurring" },
    { name: "Amazon", amount: -2100, category: "Shopping", date: "4 days ago", tag: "High Spend" }
  ],
  insights: [
    { message: "You are spending 20% more than last week", type: "warning" },
    { message: "Your food budget is almost exhausted", type: "warning" },
    { message: "You saved more than usual this month", type: "success" },
    { message: "Lowering subscriptions could save you ₹400/mo", type: "trend" }
  ]
};

const DashboardPage = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-foreground">Command Center</h2>
          <p className="text-muted-foreground mt-1">Real-time overview of your financial snapshot.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/5 border border-border/50 font-bold text-sm hover:bg-white/10 transition-all">
            Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary text-primary-foreground font-black text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
            <Plus className="h-4 w-4" />
            Quick Action
          </button>
        </div>
      </div>

      {/* Section 1: Financial Snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Balance" 
          value={MOCK_DATA.balance} 
          trend="up" 
          trendValue="+12.5%" 
          subtext="Available in 3 accounts"
          icon={Wallet}
        />
        <StatCard 
          title="Monthly Income" 
          value={MOCK_DATA.income} 
          trend="up" 
          trendValue="+4.2%" 
          subtext="Total consolidated"
          icon={TrendingUp}
        />
        <StatCard 
          title="Monthly Expenses" 
          value={MOCK_DATA.expenses} 
          trend="down" 
          trendValue="-8.1%" 
          subtext="vs last month"
          icon={TrendingDown}
        />
        <StatCard 
          title="Net Savings" 
          value={MOCK_DATA.savings} 
          trend="up" 
          trendValue="+15%" 
          subtext="Great progress!"
          icon={PieChartIcon}
        />
      </div>

      {/* Section 2: Cash Flow + Budget Health */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 rounded-3xl bg-card/30 backdrop-blur-xl border border-border/50 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black tracking-tight">Cash Flow</h3>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-white/5 px-2 py-1 rounded-lg">Real-time</span>
          </div>
          <CashFlowWidget 
            dailyAvg={MOCK_DATA.dailyAvg} 
            burnRate={MOCK_DATA.burnRate} 
            projection={MOCK_DATA.projection} 
          />
        </div>

        <div className="lg:col-span-8 rounded-3xl bg-card/30 backdrop-blur-xl border border-border/50 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black tracking-tight text-foreground">Budget Health</h3>
            <button className="text-xs text-primary font-bold flex items-center gap-1 hover:underline">
              View All <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_DATA.budgets.map((budget, i) => (
              <BudgetHealthWidget key={i} {...budget} />
            ))}
          </div>
        </div>
      </div>

      {/* Section 3: Goals + Group Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-3xl bg-card/30 backdrop-blur-xl border border-border/50 p-6">
          <h3 className="text-lg font-black tracking-tight mb-6">Financial Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_DATA.goals.map((goal, i) => (
              <GoalsWidget key={i} {...goal} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 rounded-3xl bg-card/30 backdrop-blur-xl border border-border/50 p-6">
          <h3 className="text-lg font-black tracking-tight mb-6">Group Summary</h3>
          <GroupSummaryWidget 
            owe={MOCK_DATA.owe} 
            owed={MOCK_DATA.owed} 
            groups={MOCK_DATA.groups} 
          />
        </div>
      </div>

      {/* Section 4 & 5: Transactions + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-card/30 backdrop-blur-xl border border-border/50 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black tracking-tight">Recent Activity</h3>
            <button className="text-xs text-primary font-bold flex items-center gap-1 hover:underline">
              Full Statement <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <TransactionList transactions={MOCK_DATA.transactions} />
        </div>

        <div className="rounded-3xl bg-primary/5 border-2 border-primary/20 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="relative z-10 w-full">
            <div className="flex items-center justify-center gap-2 text-primary mb-2">
              <Sparkles className="h-5 w-5 animate-pulse" />
              <h3 className="text-lg font-black uppercase tracking-widest italic">Smart Insights</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-6 max-w-[280px] mx-auto">AI-powered suggestions to optimize your financial habits.</p>
            <SmartInsights insights={MOCK_DATA.insights} />
          </div>
          
          {/* Background subtle light effects */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -ml-32 -mt-32" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] -mr-32 -mb-32" />
        </div>
      </div>

      {/* Quick Access Floating Action Button (Mobile) */}
      <button className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/40 flex items-center justify-center lg:hidden z-50 hover:scale-110 active:scale-95 transition-all">
        <Plus className="h-7 w-7" />
      </button>
    </div>
  );
};

export default DashboardPage;
