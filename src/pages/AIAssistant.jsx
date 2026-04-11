import React, { useState } from 'react';

const Message = ({ sender, text, type }) => {
  const isAI = sender === 'PRISM';
  return (
    <div className={`flex flex-col mb-6 ${isAI ? 'items-start' : 'items-end'}`}>
       <div className={`flex items-center gap-2 mb-1.5 ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold uppercase ${isAI ? 'bg-primary/20 text-primary' : 'bg-surface-container-highest text-on-surface-variant'}`}>
             {sender[0]}
          </div>
          <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">{sender}</span>
       </div>
       
       <div className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-xl text-sm leading-relaxed ${
         isAI 
           ? 'bg-surface-container border border-white/5 rounded-tl-sm text-white' 
           : 'bg-primary text-black font-medium rounded-tr-sm'
       }`}>
          {text}
          {type === 'tip' && (
            <div className={`mt-3 pt-3 flex items-start gap-2 ${isAI ? 'border-t border-white/10' : 'border-t border-black/10'}`}>
               <span className={`material-symbols-outlined text-[16px] ${isAI ? 'text-primary' : 'text-black/70'}`}>auto_awesome</span>
               <p className={`text-xs font-medium ${isAI ? 'text-primary' : 'text-black/90'}`}>Tip: Canceling your least-used streaming service would save you $179 annually.</p>
            </div>
          )}
       </div>
    </div>
  );
};

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { sender: 'PRISM', text: "How can I assist your wealth today? I have processed your latest 42 transactions. Your net worth has increased by 2.4% this month.", type: 'intro' },
    { sender: 'You', text: "Analyze my subscriptions. Which ones have seen price increases in the last quarter?", type: 'user' },
    { sender: 'PRISM', text: "Based on your transaction history, I've identified three subscriptions with updated pricing including Cloud Alpha and StreamMax.", type: 'tip' }
  ]);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
      
      {/* Real-time Insights Sidebar (Left for desktop focus) */}
      <div className="hidden lg:flex w-80 flex-col gap-4">
         <div className="bg-surface-container border border-white/5 p-5 rounded-xl space-y-6">
            <h3 className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider border-b border-white/5 pb-3">Financial Health</h3>
            
            <div className="flex items-center gap-4">
               <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                     <circle cx="24" cy="24" r="20" className="stroke-surface-container-highest fill-none" strokeWidth="3" />
                     <circle cx="24" cy="24" r="20" className="stroke-primary fill-none" strokeWidth="3" strokeDasharray="125.6" strokeDashoffset="31" strokeLinecap="round" />
                  </svg>
                  <span className="absolute text-xs font-bold text-white">74</span>
               </div>
               <div>
                  <p className="text-xl font-bold text-white leading-none tnum tracking-tight">+4 pts</p>
                  <p className="text-[10px] text-on-surface-variant font-medium mt-1">Weekly Improvement</p>
               </div>
            </div>

            <div className="space-y-4">
               <div>
                  <div className="flex justify-between text-[10px] font-semibold tracking-wider uppercase mb-1.5">
                     <span className="text-on-surface-variant">Savings Velocity</span>
                     <span className="text-white tnum">82%</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                     <div className="h-full bg-primary rounded-full w-[82%]"></div>
                  </div>
               </div>
               <div>
                  <div className="flex justify-between text-[10px] font-semibold tracking-wider uppercase mb-1.5">
                     <span className="text-on-surface-variant">Risk Exposure</span>
                     <span className="text-white tnum">14%</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                     <div className="h-full bg-error rounded-full w-[14%]"></div>
                  </div>
               </div>
            </div>
         </div>

         <div className="bg-surface-container border border-white/5 p-5 rounded-xl flex-1 flex flex-col">
            <h3 className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-4">Market Context</h3>
            <div className="space-y-3 flex-1">
               <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <p className="text-xs font-medium text-white">Global Indices</p>
                  <span className="text-[9px] px-1.5 py-0.5 bg-primary/20 text-primary font-semibold rounded uppercase">Open</span>
               </div>
               <p className="text-xs text-on-surface-variant leading-relaxed">Anticipation of Q4 volatility is driving adaptive buffers in core portfolios.</p>
            </div>
            <button className="mt-4 w-full py-2 bg-surface-container-high hover:bg-surface-container-highest border border-white/5 text-white text-xs font-semibold rounded-md transition-colors">
              Review Buffers
            </button>
         </div>
      </div>

      {/* Main Assistant Interface */}
      <div className="flex-1 flex flex-col bg-surface-container border border-white/5 rounded-xl overflow-hidden relative">
         
         {/* Chat Canvas */}
         <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
            {messages.map((m, i) => (
              <Message key={i} sender={m.sender} text={m.text} type={m.type} />
            ))}
            <div className="h-4"></div>
         </div>

         {/* Interaction Rail */}
         <div className="p-4 bg-surface-container border-t border-white/5">
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar">
               {[
                 "Analyze subscriptions", 
                 "Project Q4 Net Worth", 
                 "Optimize Portfolio",
                 "Security Audit"
               ].map((prompt) => (
                 <button key={prompt} className="whitespace-nowrap px-3 py-1.5 bg-surface-container-high hover:bg-surface-container-highest border border-white/5 rounded-md text-[10px] font-semibold text-on-surface-variant hover:text-white transition-colors">
                   {prompt}
                 </button>
               ))}
            </div>

            <div className="relative">
               <input 
                 className="w-full h-12 bg-background border border-white/10 focus:border-primary/50 rounded-lg pl-4 pr-12 text-sm text-white placeholder:text-outline/30 outline-none transition-colors"
                 placeholder="Message PRISM..."
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
               />
               <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary text-black rounded-md flex items-center justify-center hover:bg-white transition-colors disabled:opacity-50 disabled:hover:bg-primary" disabled={!inputValue.trim()}>
                  <span className="material-symbols-outlined font-bold text-[18px]">arrow_upward</span>
               </button>
            </div>
         </div>

      </div>

    </div>
  );
};

export default AIAssistant;
