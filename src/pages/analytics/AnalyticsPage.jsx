import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import FeatureHeader from '@/components/commonUI/FeatureHeader';
import AnalysisWidget from '@/components/commonUI/AnalysisWidget';
import AddAnalysisModal from '@/components/commonUI/AddAnalysisModal';
import analyticsService from '@/services/analyticsService/analyticsService';
import { LayoutGrid, Plus, SlidersHorizontal, Trash2, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AnalyticsPage = () => {
  const [activeWidgets, setActiveWidgets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableAnalyses, setAvailableAnalyses] = useState([]);
  const [filters, setFilters] = useState({ category: 'All', goal: 'All', period: 'Last 30 Days' });

  // Load state from localStorage on mount
  useEffect(() => {
    const savedWidgets = localStorage.getItem('prism_analytics_layout');
    if (savedWidgets) {
      setActiveWidgets(JSON.parse(savedWidgets));
    } else {
      // Default layout for new users
      const defaults = [
        { id: 'cat-01', title: 'Spending by Category', type: 'pie' },
        { id: 'trend-01', title: 'Monthly Burn Rate', type: 'line' },
        { id: 'comp-01', title: 'Budget vs Actual', type: 'bar' }
      ];
      setActiveWidgets(defaults);
      localStorage.setItem('prism_analytics_layout', JSON.stringify(defaults));
    }
    setAvailableAnalyses(analyticsService.getAvailableAnalyses());
  }, []);

  // Save state to localStorage whenever widgets change
  useEffect(() => {
    if (activeWidgets.length > 0) {
      localStorage.setItem('prism_analytics_layout', JSON.stringify(activeWidgets));
    }
  }, [activeWidgets]);

  const addWidget = (item) => {
    // Prevent duplicates
    if (activeWidgets.find(w => w.id === item.id)) return;
    setActiveWidgets([...activeWidgets, item]);
  };

  const removeWidget = (id) => {
    setActiveWidgets(activeWidgets.filter(w => w.id !== id));
  };

  const clearDashboard = () => {
    if (window.confirm('Are you sure you want to clear your analytics dashboard?')) {
      setActiveWidgets([]);
      localStorage.removeItem('prism_analytics_layout');
    }
  };

  return (
    <AppLayout>
      <div className="space-y-10 pb-20">
        <FeatureHeader 
          title="Analysis Hub" 
          description="Detailed financial intelligence with interactive visualization widgets."
          actionText="Add Analysis"
          onAction={() => setIsModalOpen(true)}
        />

        {/* Global Filters Bar */}
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-[28px] bg-card border border-border/50">
          <div className="flex items-center gap-3 px-4 border-r border-border/30">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Filters</span>
          </div>
          
          <select 
            className="bg-white/5 border border-border/50 rounded-xl px-4 py-2 text-xs font-bold outline-none cursor-pointer hover:bg-white/10"
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
          >
            <option>All Categories</option>
            <option>Food & Dining</option>
            <option>Rent & Utilities</option>
            <option>Transportation</option>
          </select>

          <select 
            className="bg-white/5 border border-border/50 rounded-xl px-4 py-2 text-xs font-bold outline-none cursor-pointer hover:bg-white/10"
            value={filters.goal}
            onChange={(e) => setFilters({...filters, goal: e.target.value})}
          >
            <option>All Goals</option>
            <option>Goa Trip 2026</option>
            <option>Home Downpayment</option>
          </select>

          <select 
            className="bg-white/5 border border-border/50 rounded-xl px-4 py-2 text-xs font-bold outline-none cursor-pointer hover:bg-white/10"
            value={filters.period}
            onChange={(e) => setFilters({...filters, period: e.target.value})}
          >
            <option>Last 30 Days</option>
            <option>Last 3 Months</option>
            <option>Current Year</option>
          </select>

          <div className="ml-auto flex items-center gap-2">
            <button 
              onClick={clearDashboard}
              className="p-3 rounded-xl bg-destructive/5 hover:bg-destructive/10 text-destructive transition-colors"
              title="Clear All"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button 
              className="px-6 py-2 rounded-xl bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.05] transition-all"
              onClick={() => setIsModalOpen(true)}
            >
              Add Widget
            </button>
          </div>
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {activeWidgets.map((widget) => (
              <AnalysisWidget 
                key={widget.id}
                id={widget.id}
                title={widget.title}
                type={widget.type}
                onRemove={() => removeWidget(widget.id)}
              />
            ))}
          </AnimatePresence>

          {/* Empty State Add Button */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="h-[360px] rounded-[32px] border-2 border-dashed border-border/50 bg-white/5 hover:bg-white/10 hover:border-primary/30 transition-all flex flex-col items-center justify-center gap-4 text-muted-foreground group"
          >
            <div className="p-5 rounded-3xl bg-white/5 group-hover:bg-primary/10 group-hover:text-primary transition-all">
              <Plus className="h-8 w-8" />
            </div>
            <p className="text-xs font-black uppercase tracking-widest">Add New View</p>
          </button>
        </div>
      </div>

      <AddAnalysisModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addWidget}
        availableItems={availableAnalyses}
      />
    </AppLayout>
  );
};

export default AnalyticsPage;
