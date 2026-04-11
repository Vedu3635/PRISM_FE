import React from 'react';

const SettingsOption = ({ icon, label, sub, active }) => (
  <div className={`p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-colors border border-transparent ${
    active ? 'bg-primary/10 border-primary/20 group' : 'hover:bg-surface-container-high text-on-surface-variant hover:text-white'
  }`}>
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
      active ? 'bg-primary text-black' : 'bg-surface-container-highest text-on-surface-variant'
    }`}>
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
    </div>
    <div className="flex-1">
       <p className="text-sm font-semibold text-white leading-none mb-1">{label}</p>
       <p className="text-[10px] uppercase font-semibold tracking-wider text-on-surface-variant group-hover:text-primary transition-colors">{sub}</p>
    </div>
  </div>
);

const Settings = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      
      {/* Settings Navigation */}
      <div className="lg:w-80 shrink-0 space-y-2">
         <h1 className="text-3xl font-bold text-white tracking-tight mb-6 px-1">Settings</h1>
         <SettingsOption icon="person" label="Personal Info" sub="Account Customization" active />
         <SettingsOption icon="shield" label="Security" sub="Vault Protection" />
         <SettingsOption icon="settings" label="Preferences" sub="System Behavior" />
         <SettingsOption icon="database" label="Data Management" sub="Export & Sync" />
      </div>

      {/* Settings Content */}
      <div className="flex-1 space-y-6 lg:mt-14">
         <div className="bg-surface-container border border-white/5 rounded-xl p-6 sm:p-8">
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 pb-8 border-b border-white/5">
                <div className="w-20 h-20 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0 border border-white/10">
                   <span className="text-2xl font-bold text-white">AT</span>
                </div>
                <div className="text-center sm:text-left flex-1">
                   <h2 className="text-xl font-bold text-white mb-1">Alexander Thorne</h2>
                   <p className="text-sm text-on-surface-variant mb-4">alexander.thorne@prism.io</p>
                   <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                      <span className="px-2.5 py-1 bg-surface-container-high rounded-md text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider border border-white/5">Obsidian Tier</span>
                      <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-[10px] font-semibold uppercase tracking-wider border border-primary/20">Verified Identity</span>
                   </div>
                </div>
                <button className="px-4 py-2 bg-white text-black font-semibold rounded-md text-xs hover:bg-neutral-200 transition-colors w-full sm:w-auto">
                   Edit Profile
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <h4 className="text-[10px] font-semibold text-white uppercase tracking-wider pb-2 border-b border-white/5">Appearance</h4>
                  <div className="space-y-3 pt-2">
                     <div className="flex items-center justify-between p-4 rounded-lg bg-surface border border-white/5 hover:border-white/10 transition-colors cursor-pointer">
                        <span className="text-sm font-semibold text-white">Focus Mode</span>
                        <div className="w-10 h-6 bg-primary rounded-full p-1"><div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm"></div></div>
                     </div>
                     <p className="text-xs text-on-surface-variant leading-relaxed px-1">Reduces visual noise and emphasizes your net worth velocity index.</p>
                  </div>
               </div>

               <div className="space-y-4">
                  <h4 className="text-[10px] font-semibold text-white uppercase tracking-wider pb-2 border-b border-white/5">Vault Status</h4>
                  <div className="p-4 rounded-lg bg-surface border border-white/5 space-y-3 mt-2">
                     <div className="flex gap-3 items-start">
                        <span className="material-symbols-outlined text-primary text-[20px]">verified_user</span>
                        <p className="text-sm font-medium text-white leading-relaxed">
                           Protected with <span className="text-primary font-bold">256-bit encryption</span>.
                        </p>
                     </div>
                     <p className="text-xs text-on-surface-variant leading-relaxed opacity-80">
                        Recommend enabling biometric authentication for mobile.
                     </p>
                  </div>
               </div>
            </div>
         </div>

         {/* Advanced Prefs */}
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-surface-container p-6 rounded-xl border border-error/20 flex flex-col items-start">
               <h4 className="text-sm font-semibold text-error mb-2">Danger Zone</h4>
               <p className="text-xs text-on-surface-variant mb-6 leading-relaxed flex-1">Permanently delete your PRISM account and all calculated wealth simulations.</p>
               <button className="text-xs font-semibold text-white px-4 py-2 bg-error/20 rounded-md hover:bg-error transition-colors mt-auto">
                  Deactivate Account
               </button>
            </div>
            <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 flex flex-col justify-center items-center text-center">
               <span className="material-symbols-outlined text-primary text-[32px] mb-3">workspace_premium</span>
               <p className="text-sm font-semibold text-white mb-1">Workspace Elite</p>
               <p className="text-xs text-on-surface-variant font-medium">Next Billing: Nov 14, 2024</p>
            </div>
         </div>
      </div>

    </div>
  );
};

export default Settings;
