import React from 'react';

import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="w-full bg-background flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 sm:px-10 py-4 flex justify-between items-center bg-surface/80 backdrop-blur-md border-b border-white/5">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center">
               <span className="material-symbols-outlined text-black font-bold text-[18px]">hub</span>
            </div>
            <span className="text-lg font-bold text-white tracking-wide">PRISM</span>
         </div>
         <div className="flex items-center gap-6">
            <Link to="/login" className="text-sm font-semibold text-on-surface-variant hover:text-white transition-colors hidden sm:block">Login</Link>
            <Link to="/onboarding" className="px-5 py-2 bg-white text-black rounded-md text-sm font-semibold hover:bg-neutral-200 transition-colors">Get Started</Link>
         </div>
      </nav>

      {/* Hero Section */}
        <section className="pt-32 pb-24 md:pt-40 md:pb-32 px-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
             <div className="flex-1 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high border border-white/5">
                   <div className="w-2 h-2 rounded-full bg-primary"></div>
                   <span className="text-xs font-semibold text-white tracking-wide">Intelligence Redefined</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
                   Your Wealth,<br/>
                   <span className="text-on-surface-variant">Reimagined by AI.</span>
                </h1>
                <p className="text-lg text-on-surface-variant max-w-lg leading-relaxed">
                   PRISM is the modern architect of your financial future. Securely aggregate accounts, forecast net worth with precise modeling, and receive actionable insights.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                   <Link to="/onboarding" className="px-6 py-3 bg-primary text-black font-semibold rounded-md hover:bg-white transition-colors">
                      Start Building
                   </Link>
                   <Link to="/onboarding" className="px-6 py-3 bg-surface border border-white/10 text-white font-semibold rounded-md hover:bg-surface-container-high transition-colors flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                      View Demo
                   </Link>
                </div>
             </div>
             
             <div className="flex-1 w-full flex justify-center lg:justify-end">
                <div className="w-full max-w-lg aspect-[4/3] bg-surface-container border border-white/5 rounded-xl overflow-hidden relative group p-2">
                   <img 
                      className="w-full h-full object-cover rounded-lg border border-white/5" 
                      alt="Modern financial interface preview" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD17pZ5WNHFF1FtaM78MyTijECfX0tLgA4sCpkBvf_5i-xs8kPcEXp0zCuXWtAb5mbBlbM5h2YLDt0tziUdHWp1py5hTPBTavsUgUgfcGHIjXB3SZmY83C448vx03BHlChJdn75jbrItdBMMrHFSFHpYy8LDSCul6YKK-dAbYXOyNnLHzOopJxftZdSUCN5OlW38T_w5OlGe0Wb9cX8yEoQ4pGTw-ciyDEtXVgNUQoZDB14rsIBoykmYOQHgmONAMlJwcKMSY3q1i7r"
                   />
                   <div className="absolute bottom-6 -left-6 bg-surface p-5 rounded-xl border border-white/10 shadow-2xl hidden md:block">
                      <p className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Net Worth Velocity</p>
                      <p className="text-2xl font-bold text-white tracking-tight">+$142,000</p>
                      <div className="flex items-center gap-1.5 mt-2 text-primary">
                         <span className="material-symbols-outlined text-[16px]">trending_up</span>
                         <span className="text-xs font-semibold">+12.4%</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-24 bg-surface-container-lowest border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Master Your Capital.</h2>
              <p className="text-lg text-on-surface-variant">Sophisticated tools for the modern wealth architect.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Feature 1 */}
              <div className="md:col-span-2 bg-surface-container border border-white/5 p-10 rounded-xl flex flex-col justify-between h-[450px]">
                <div>
                  <span className="material-symbols-outlined text-white text-[32px] mb-6">psychology</span>
                  <h3 className="text-2xl font-bold text-white mb-3">AI-Driven Insights</h3>
                  <p className="text-on-surface-variant leading-relaxed max-w-md">
                    Beyond simple tracking. PRISM analyzes thousands of distinct data points to offer proactive advice on tax harvesting, spending optimization, and intelligent asset allocation.
                  </p>
                </div>
                <div className="bg-surface border border-white/5 rounded-lg p-5 mt-8 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                         <span className="material-symbols-outlined text-primary text-[16px]">bolt</span>
                      </div>
                      <span className="text-sm font-medium text-white">Insight: Consolidate active subscriptions</span>
                   </div>
                   <span className="text-primary text-sm font-bold">+$48/mo</span>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-surface-container border border-white/5 p-10 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="material-symbols-outlined text-white text-[32px] mb-6">shield</span>
                  <h3 className="text-xl font-bold text-white mb-3">The Vault</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Zero-knowledge encryption for all connected institutions. Bank-level security protocols ensure your data remains strictly confidential and entirely yours.
                  </p>
                </div>
                <div className="pt-8">
                   <div className="w-16 h-16 rounded-xl bg-surface border border-white/5 flex items-center justify-center mx-auto">
                      <span className="material-symbols-outlined text-white text-[24px]">lock</span>
                   </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="md:col-span-3 bg-surface-container border border-white/5 p-10 rounded-xl flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                  <span className="material-symbols-outlined text-white text-[32px] mb-6">timeline</span>
                  <h3 className="text-2xl font-bold text-white mb-3">Predictive Forecasting</h3>
                  <p className="text-on-surface-variant leading-relaxed mb-6">
                    See exactly where your wealth is headed. Our deterministic models simulate your 12-month capital outlook based on your current cashflow velocity and asset appreciation timelines.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-sm text-white">
                      <span className="material-symbols-outlined text-[18px]">check</span>
                      Scenario testing for real estate purchases
                    </li>
                    <li className="flex items-center gap-3 text-sm text-white">
                      <span className="material-symbols-outlined text-[18px]">check</span>
                      Automated inflation-adjusted growth
                    </li>
                  </ul>
                </div>
                
                <div className="flex-1 w-full bg-surface border border-white/5 rounded-lg p-6 relative h-64 overflow-hidden">
                   <div className="flex items-end h-full gap-2 pt-16">
                      {[30, 45, 40, 60, 55, 75, 70, 90].map((h, i) => (
                         <div key={i} className="flex-1 bg-surface-container-highest rounded-t-sm transition-all hover:bg-white" style={{ height: `${h}%` }}></div>
                      ))}
                   </div>
                   <div className="absolute top-6 right-6 text-right">
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-on-surface-variant">Q4 Target</p>
                      <p className="text-xl font-bold text-white">$1.25M</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Invest in Clarity.</h2>
              <p className="text-lg text-on-surface-variant">Built for those who value signal over noise.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              
              <div className="bg-surface-container border border-white/5 p-8 rounded-xl flex flex-col">
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-white mb-1">Standard</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">$0</span>
                    <span className="text-sm text-on-surface-variant">/mo</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                     <span className="material-symbols-outlined text-[16px]">check</span> 2 External Accounts
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                     <span className="material-symbols-outlined text-[16px]">check</span> Transaction Ledger
                  </li>
                </ul>
                <button className="w-full py-2.5 bg-surface border border-white/10 rounded-md text-white font-semibold text-sm hover:bg-surface-container-high transition-colors">Start Free</button>
              </div>

              <div className="bg-surface-container-highest border border-white/10 p-8 rounded-xl flex flex-col relative md:-translate-y-4 md:shadow-2xl z-10">
                <div className="absolute top-0 right-6 -translate-y-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">Recommended</div>
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-white mb-1">Architect</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">$19</span>
                    <span className="text-sm text-on-surface-variant">/mo</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-3 text-sm text-white">
                     <span className="material-symbols-outlined text-[16px]">check</span> Unlimited Connections
                  </li>
                  <li className="flex items-center gap-3 text-sm text-white">
                     <span className="material-symbols-outlined text-[16px]">check</span> Predictive Intelligence
                  </li>
                  <li className="flex items-center gap-3 text-sm text-white">
                     <span className="material-symbols-outlined text-[16px]">check</span> Smart Goal Allocator
                  </li>
                </ul>
                <button className="w-full py-2.5 bg-white text-black rounded-md font-semibold text-sm hover:bg-neutral-200 transition-colors">Go Premium</button>
              </div>

              <div className="bg-surface-container border border-white/5 p-8 rounded-xl flex flex-col">
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-white mb-1">Enterprise</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">$99</span>
                    <span className="text-sm text-on-surface-variant">/mo</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                     <span className="material-symbols-outlined text-[16px]">check</span> Multi-Entity Structuring
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                     <span className="material-symbols-outlined text-[16px]">check</span> Direct API Access
                  </li>
                </ul>
                <button className="w-full py-2.5 bg-surface border border-white/10 rounded-md text-white font-semibold text-sm hover:bg-surface-container-high transition-colors">Contact Sales</button>
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Stop monitoring.<br/>Start architecting.</h2>
            <p className="text-on-surface-variant text-lg mb-10">
               Join thousands of professionals securing their financial autonomy.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
               <input 
                 className="bg-surface border border-white/10 text-white px-4 py-3 rounded-md w-full outline-none focus:border-white/30 text-sm" 
                 placeholder="name@company.com" 
                 type="email"
               />
               <button className="px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-neutral-200 transition-colors shrink-0 text-sm">
                 Request Access
               </button>
            </div>
          </div>
        </section>

      {/* Footer */}
      <footer className="bg-surface border-t border-white/5 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-white text-[16px]">hub</span>
              <span className="text-sm font-bold text-white tracking-wide">PRISM</span>
           </div>
           <div className="flex items-center gap-6">
              <Link to="#" className="text-xs font-medium text-on-surface-variant hover:text-white transition-colors">Security</Link>
              <Link to="#" className="text-xs font-medium text-on-surface-variant hover:text-white transition-colors">Terms of Service</Link>
              <Link to="#" className="text-xs font-medium text-on-surface-variant hover:text-white transition-colors">Privacy Policy</Link>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
