import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    incomeTier: null,
    spendingHabits: [],
    financialGoals: []
  });

  // Step 4 Animation state
  const [initPercent, setInitPercent] = useState(0);

  useEffect(() => {
    if (step === 4) {
      const interval = setInterval(() => {
        setInitPercent(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [step]);

  const toggleSelect = (field, value) => {
    setFormData(prev => {
      const current = prev[field];
      const exists = current.includes(value);
      if (exists) {
        return { ...prev, [field]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const setSingleSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  // --- RENDERING LOGIC ---

  const renderStep1 = () => {
    const incomeLevels = [
      { id: 'tier1', range: '< $100k', label: 'Builder' },
      { id: 'tier2', range: '$100k - $250k', label: 'Accumulator' },
      { id: 'tier3', range: '$250k - $1M', label: 'Architect' },
      { id: 'tier4', range: '$1M+', label: 'Obsidian Tier' },
    ];
    return (
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight mb-3 text-white">Define your Foundation.</h1>
        <p className="text-on-surface-variant text-sm mb-10 max-w-lg">
          PRISM curates strategic financial intelligence automatically based on your structural scale.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {incomeLevels.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setSingleSelect('incomeTier', tier.id)}
              className={`text-left p-5 rounded-xl border transition-colors flex flex-col justify-between ${
                formData.incomeTier === tier.id 
                  ? 'bg-primary/5 border-primary shadow-[0_0_0_1px_rgba(75,77,216,0.5)]' 
                  : 'bg-surface-container border-white/5 hover:bg-surface-container-high'
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant mb-1">{tier.label}</p>
                    <p className="text-lg font-bold text-white">{tier.range}</p>
                 </div>
                 <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${formData.incomeTier === tier.id ? 'bg-primary border-primary' : 'border-white/20'}`}>
                    {formData.incomeTier === tier.id && <span className="material-symbols-outlined text-[12px] text-black font-bold">check</span>}
                 </div>
              </div>
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center py-5 border-t border-white/5">
           <Link to="/login" className="px-5 py-2 text-sm font-semibold text-on-surface-variant hover:text-white transition-colors">Cancel Setup</Link>
           <button 
             onClick={nextStep}
             disabled={!formData.incomeTier}
             className={`px-6 py-2.5 rounded-md font-semibold text-sm transition-colors flex items-center gap-1 ${
               formData.incomeTier 
                 ? 'bg-primary hover:bg-white text-black'
                 : 'bg-surface-container-highest text-on-surface-variant/50 cursor-not-allowed'
             }`}
           >
             Continue <span className="material-symbols-outlined text-[18px]">chevron_right</span>
           </button>
        </div>
      </div>
    );
  };

  const renderStep2 = () => {
    const habits = [
      { id: 'housing', label: 'Housing', sub: 'Rent, Mortgage, Utilities', icon: 'home' },
      { id: 'groceries', label: 'Groceries', sub: 'Supermarkets, Food', icon: 'shopping_cart' },
      { id: 'leisure', label: 'Dining & Leisure', sub: 'Restaurants, Cinema', icon: 'local_bar' },
      { id: 'tech', label: 'Tech & Gadgets', sub: 'SaaS, Software, Gear', icon: 'devices' },
      { id: 'travel', label: 'Travel & Transit', sub: 'Flights, Hotels', icon: 'flight' },
      { id: 'subs', label: 'Digital Subs', sub: 'Streaming, Storage', icon: 'subscriptions' },
    ];
    return (
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight mb-3 text-white">Where does your money flow?</h1>
        <p className="text-on-surface-variant text-sm mb-10 max-w-lg">
           Toggle categories to train your local AI model for accurate transaction labeling and forecasting.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {habits.map((h) => (
            <button
              key={h.id}
              onClick={() => toggleSelect('spendingHabits', h.id)}
              className={`text-left p-5 rounded-xl border transition-colors ${
                formData.spendingHabits.includes(h.id)
                  ? 'bg-primary/5 border-primary flex-col shadow-[0_0_0_1px_rgba(75,77,216,0.5)]' 
                  : 'bg-surface-container border-white/5 hover:bg-surface-container-high'
              }`}
            >
              <span className={`material-symbols-outlined text-[24px] mb-3 inline-block ${formData.spendingHabits.includes(h.id) ? 'text-primary' : 'text-on-surface-variant'}`}>{h.icon}</span>
              <p className="text-sm font-semibold text-white mb-0.5">{h.label}</p>
              <p className="text-[11px] text-on-surface-variant">{h.sub}</p>
            </button>
          ))}
        </div>

        <div className="bg-surface-container p-4 rounded-xl border border-white/5 mb-10 flex items-center gap-3">
           <div className="w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center shrink-0">
             <span className="material-symbols-outlined text-primary text-[18px]">psychology</span>
           </div>
           <p className="text-sm text-on-surface-variant flex-1">Based on your structural scale, most users track <span className="text-white font-medium">Health & Wellness</span>. Want to add it?</p>
           <button className="px-4 py-2 bg-surface border border-white/10 hover:bg-surface-container-high text-white text-xs font-semibold rounded-md transition-colors shrink-0">Add Category</button>
        </div>

        <div className="flex justify-between items-center py-5 border-t border-white/5">
           <button onClick={prevStep} className="px-5 py-2 text-sm font-semibold text-on-surface-variant hover:text-white transition-colors">Back</button>
           <button 
             onClick={nextStep}
             disabled={formData.spendingHabits.length === 0}
             className={`px-6 py-2.5 rounded-md font-semibold text-sm transition-colors flex items-center gap-1 ${
               formData.spendingHabits.length > 0
                 ? 'bg-primary hover:bg-white text-black'
                 : 'bg-surface-container-highest text-on-surface-variant/50 cursor-not-allowed'
             }`}
           >
             Continue <span className="material-symbols-outlined text-[18px]">chevron_right</span>
           </button>
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    const goals = [
      { id: 'safety', label: 'Safe House', sub: '6 Month Emergency Fund', icon: 'security' },
      { id: 'zen', label: 'Zen Retirement', sub: 'Long-term Portfolio Growth', icon: 'self_improvement' },
      { id: 'property', label: 'Property Expansion', sub: 'Next Assets & Real Estate', icon: 'domain' },
      { id: 'experience', label: 'Experience Fund', sub: 'Travel & Lifestyle Wealth', icon: 'explore' },
    ];
    return (
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight mb-3 text-white">Architect your Legacy.</h1>
        <p className="text-on-surface-variant text-sm mb-10 max-w-lg">
           What are the structural targets for your capital? PRISM prioritizes these in its wealth forecasting engine.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {goals.map((g) => (
            <button
              key={g.id}
              onClick={() => toggleSelect('financialGoals', g.id)}
              className={`text-left p-5 rounded-xl border flex items-center gap-4 transition-colors ${
                formData.financialGoals.includes(g.id)
                  ? 'bg-primary/5 border-primary shadow-[0_0_0_1px_rgba(75,77,216,0.5)]' 
                  : 'bg-surface-container border-white/5 hover:bg-surface-container-high'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors ${formData.financialGoals.includes(g.id) ? 'bg-primary' : 'bg-surface-container-highest'}`}>
                <span className={`material-symbols-outlined text-[24px] ${formData.financialGoals.includes(g.id) ? 'text-black' : 'text-on-surface-variant'}`}>{g.icon}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white mb-0.5">{g.label}</p>
                <p className="text-[11px] text-on-surface-variant">{g.sub}</p>
              </div>
              <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors border ${formData.financialGoals.includes(g.id) ? 'bg-primary border-primary' : 'border-white/20'}`}>
                  {formData.financialGoals.includes(g.id) && <span className="material-symbols-outlined text-[14px] text-black font-bold">check</span>}
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center py-5 border-t border-white/5">
           <button onClick={prevStep} className="px-5 py-2 text-sm font-semibold text-on-surface-variant hover:text-white transition-colors">Back</button>
           <button 
             onClick={nextStep}
             disabled={formData.financialGoals.length === 0}
             className={`px-6 py-2.5 rounded-md font-semibold text-sm transition-colors flex items-center gap-1.5 ${
               formData.financialGoals.length > 0
                 ? 'bg-primary hover:bg-white text-black'
                 : 'bg-surface-container-highest text-on-surface-variant/50 cursor-not-allowed'
             }`}
           >
             Initialize <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
           </button>
        </div>
      </div>
    );
  };

  const renderStep4 = () => {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="relative w-32 h-32 mb-10">
            <svg className="w-full h-full -rotate-90">
                <circle 
                  cx="64" cy="64" r="56" 
                  className="stroke-surface-container-highest fill-none" 
                  strokeWidth="8"
                />
                <circle 
                  cx="64" cy="64" r="56" 
                  className="stroke-primary fill-none transition-all duration-300"
                  strokeWidth="8"
                  strokeDasharray="351.8"
                  strokeDashoffset={351.8 - (351.8 * initPercent) / 100}
                  strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-white tnum">{initPercent}%</span>
                <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider mt-0.5">Syncing</span>
            </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-4">Configuring your Dashboard...</h2>
        <div className="text-on-surface-variant text-xs space-y-2 mb-10 text-left font-mono bg-surface-container border border-white/5 p-4 rounded-lg w-full max-w-sm">
           <p className={initPercent > 20 ? 'text-white transition-colors' : 'opacity-40'}>&gt; Analyzing selected parameters</p>
           <p className={initPercent > 50 ? 'text-white transition-colors' : 'opacity-40'}>&gt; Building category models</p>
           <p className={initPercent > 80 ? 'text-white transition-colors' : 'opacity-40'}>&gt; Finalizing interface vectors</p>
        </div>

        <button 
           disabled={initPercent < 100}
           onClick={() => navigate('/signup')}
           className={`px-8 py-3 rounded-md font-semibold text-sm transition-colors w-full max-w-sm ${
            initPercent === 100
              ? 'bg-primary hover:bg-white text-black'
              : 'bg-surface-container-highest text-on-surface-variant/50 cursor-wait'
           }`}
        >
          {initPercent === 100 ? 'Go to Register' : 'Processing...'}
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full flex justify-center pt-16 sm:pt-24 px-6 bg-background">
      <div className="max-w-3xl w-full">
        {step < 4 && (
          <div className="mb-10 flex gap-1.5 w-full sm:w-1/2">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${step >= s ? 'bg-primary' : 'bg-surface-container-highest'}`}></div>
            ))}
          </div>
        )}

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>
    </div>
  );
};

export default Onboarding;
