import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import FeatureHeader from '@/components/commonUI/FeatureHeader';
import TransactionTableMini from '@/components/commonUI/TransactionTableMini';
import groupService from '@/services/groupService/groupService';
import GroupModal from '@/components/groups/GroupModal';
import Loader from '@/components/commonUI/Loader';
import { 
  Users, UserPlus, Share2, Plus, Info, ShieldCheck, Mail, 
  MoreVertical, Edit3, Trash2, Copy, CheckCircle2, Filter, Tag, Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';

const KebabMenu = ({ onEdit, onDelete, onCopyCode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        className="p-2 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10"
      >
        <MoreVertical className="h-4 w-4 text-muted-foreground" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, transformOrigin: 'top right' }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute right-0 mt-2 w-48 rounded-2xl bg-card border border-border shadow-2xl z-50 overflow-hidden"
            >
              <div className="py-1">
                <button 
                  onClick={(e) => { e.stopPropagation(); onEdit(); setIsOpen(false); }}
                  className="w-full px-4 py-3 text-left text-xs font-black uppercase tracking-widest hover:bg-primary/10 flex items-center gap-3 transition-colors"
                >
                  <Edit3 className="h-4 w-4 text-primary" /> Edit Group
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onCopyCode(); setIsOpen(false); }}
                  className="w-full px-4 py-3 text-left text-xs font-black uppercase tracking-widest hover:bg-primary/10 flex items-center gap-3 transition-colors border-t border-border/30"
                >
                  <Copy className="h-4 w-4 text-emerald-500" /> Copy Code
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onDelete(); setIsOpen(false); }}
                  className="w-full px-4 py-3 text-left text-xs font-black uppercase tracking-widest hover:bg-rose-500/10 text-rose-500 flex items-center gap-3 transition-colors border-t border-border/30"
                >
                  <Trash2 className="h-4 w-4" /> Delete Group
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [invitationCode, setInvitationCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [selectedGroupIds, setSelectedGroupIds] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDate, setSelectedDate] = useState({ 
    month: new Date().getMonth() + 1, 
    year: new Date().getFullYear() 
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const groupsData = await groupService.getGroups();
      setGroups(groupsData);
      
      // Fetch transactions for each group individually to avoid 400 Bad Request
      const txPromises = groupsData.map(group => 
        groupService.getGroupTransactions(group.id, group.name)
      );
      
      const txResults = await Promise.all(txPromises);
      const allTx = txResults.flat();
      
      setTransactions(allTx);
      
      // Initialize filters if empty
      if (selectedGroupIds.length === 0) setSelectedGroupIds(groupsData.map(g => g.id));
    } catch (error) {
      console.error("Failed to load groups data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter Categories derived from transactions or static fallback
  const availableCategories = React.useMemo(() => {
    return transactions.length > 0 
      ? [...new Set(transactions.map(t => t.category))]
      : ['Food', 'Travel', 'Shopping', 'Entertainment', 'Utilities', 'Health', 'Subscription', 'Income', 'General'];
  }, [transactions]);

  // Filtering Logic
  const filteredTransactions = transactions.filter(tx => {
    const txDate = new Date(tx.date);
    const matchesGroup = selectedGroupIds.length === 0 || selectedGroupIds.includes(tx.groupId);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(tx.category);
    const matchesMonth = txDate.getMonth() + 1 === parseInt(selectedDate.month);
    const matchesYear = txDate.getFullYear() === parseInt(selectedDate.year);
    
    return matchesGroup && matchesCategory && matchesMonth && matchesYear;
  });

  const handleJoinGroup = async () => {
    if (!invitationCode.trim()) return;
    setIsJoining(true);
    try {
      await groupService.joinGroup(invitationCode);
      await fetchData();
      setInvitationCode('');
    } catch (error) {
      alert(error.message);
    } finally {
      setIsJoining(false);
    }
  };

  const handleSaveGroup = async (formData) => {
    setIsLoading(true);
    try {
      if (editingGroup) {
        await groupService.updateGroup(editingGroup.id, formData);
      } else {
        await groupService.createGroup(formData);
      }
      await fetchData();
      setIsModalOpen(false);
      setEditingGroup(null);
    } catch (error) {
      alert(`Failed to ${editingGroup ? 'update' : 'create'} group. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteGroup = async (group) => {
    if (window.confirm(`Are you sure you want to delete "${group.name}"? This action cannot be undone.`)) {
      setIsLoading(true);
      try {
        await groupService.deleteGroup(group.id);
        await fetchData();
      } catch (error) {
        alert("Failed to delete group.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert("Invitation code copied to clipboard!");
  };

  const headerActions = [
    { label: 'Create Group', variant: 'primary', icon: Plus, onClick: () => { setEditingGroup(null); setIsModalOpen(true); } },
    { label: 'Invite People', variant: 'secondary', icon: Mail, onClick: () => alert('Invite People Clicked') },
  ];

  if (isLoading && groups.length === 0) return <AppLayout><div className="h-[80vh] flex items-center justify-center"><Loader text="Preparing your collaborative ledgers..." /></div></AppLayout>;

  return (
    <AppLayout>
      <div className="space-y-10 pb-20 font-inter text-foreground">
        <FeatureHeader 
          title="Groups & Split" 
          description="Collaborate, share expenses, and maintain transparency with your circles."
          actions={headerActions}
        />

        {/* Invitation Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-[32px] bg-primary/5 border border-primary/20 flex flex-col md:flex-row items-center gap-6"
        >
          <div className="p-4 rounded-2xl bg-primary/10 text-primary">
            <UserPlus className="h-6 w-6" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-lg font-black tracking-tight uppercase">Got an Invite?</h3>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">Enter the invitation code to join your group</p>
          </div>
          <div className="flex w-full md:w-auto items-center gap-3">
            <input 
              type="text"
              placeholder="Code: AB123XYZ"
              className="h-12 w-full md:w-64 px-6 rounded-2xl bg-background border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono font-bold uppercase tracking-widest text-sm"
              value={invitationCode}
              onChange={(e) => setInvitationCode(e.target.value)}
            />
            <button 
              onClick={handleJoinGroup}
              disabled={isJoining}
              className="h-12 px-8 rounded-2xl bg-primary text-primary-foreground font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition-all"
            >
              {isJoining ? 'Joining...' : 'Join'}
            </button>
          </div>
        </motion.div>

        {/* Group Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group, idx) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-[32px] bg-card border border-border/50 group hover:border-primary/50 transition-all duration-500 overflow-hidden relative"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-white/5 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all duration-500">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight group-hover:text-primary transition-colors">{group.name}</h3>
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-0.5">
                      <ShieldCheck className="h-3 w-3 text-emerald-500" />
                      {group.members} Members
                    </div>
                  </div>
                </div>
                
                <KebabMenu 
                  onEdit={() => { setEditingGroup(group); setIsModalOpen(true); }}
                  onDelete={() => handleDeleteGroup(group)}
                  onCopyCode={() => handleCopyCode(group.code)}
                />
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-border/30 pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Settlement Balance</span>
                    <p className={cn(
                      "text-2xl font-black font-mono tracking-tighter",
                      group.balance > 0 ? "text-emerald-500" : group.balance < 0 ? "text-rose-500" : "text-foreground"
                    )}>
                      {group.balance > 0 && '+'} {group.currency === 'INR' ? '₹' : '$'} {Math.abs(group.balance).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-1">Invite Code</span>
                    <span className="px-2 py-1 rounded-lg bg-white/5 border border-border/30 text-[10px] font-mono font-bold tracking-widest uppercase">{group.code}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button className="flex-1 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all">Settle Up</button>
                  <button className="flex-1 py-3 rounded-2xl bg-primary/10 text-primary hover:bg-primary/20 text-[10px] font-black uppercase tracking-widest transition-all">New Split</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filter Section */}
        <div className="bg-card/50 border border-border/30 rounded-[32px] p-6 space-y-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <Filter className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest">Advanced Filters</h3>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Refine your ledger view</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full lg:w-auto">
              {/* Group Multi-select */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Groups</label>
                <div className="relative group">
                  <select 
                    multiple
                    className="w-full md:w-48 h-10 bg-white/5 border border-border/50 rounded-xl px-3 text-[10px] font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none overflow-hidden hover:bg-white/10"
                    value={selectedGroupIds}
                    onChange={(e) => {
                      const values = Array.from(e.target.selectedOptions, option => option.value);
                      setSelectedGroupIds(values);
                    }}
                  >
                    {groups.map(g => <option key={g.id} value={g.id} className="py-1 px-2">{g.name}</option>)}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 group-focus-within:text-primary">
                    <Users className="h-3 w-3" />
                  </div>
                </div>
              </div>

              {/* Category Multi-select */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Categories</label>
                <div className="relative group">
                  <select 
                    multiple
                    className="w-full md:w-48 h-10 bg-white/5 border border-border/50 rounded-xl px-3 text-[10px] font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none overflow-hidden hover:bg-white/10"
                    value={selectedCategories}
                    onChange={(e) => {
                      const values = Array.from(e.target.selectedOptions, option => option.value);
                      setSelectedCategories(values);
                    }}
                  >
                    {availableCategories.map(cat => <option key={cat} value={cat} className="py-1 px-2">{cat}</option>)}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 group-focus-within:text-primary">
                    <Tag className="h-3 w-3" />
                  </div>
                </div>
              </div>

              {/* Date Filter (Month/Year) */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Month & Year</label>
                <div className="flex gap-2 relative group">
                  <select 
                    className="flex-1 h-10 bg-white/5 border border-border/50 rounded-xl px-3 text-[10px] font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none hover:bg-white/10"
                    value={selectedDate.month}
                    onChange={(e) => setSelectedDate(prev => ({ ...prev, month: e.target.value }))}
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={i + 1} className="bg-card">
                        {new Date(0, i).toLocaleString('default', { month: 'short' })}
                      </option>
                    ))}
                  </select>
                  <select 
                    className="flex-1 h-10 bg-white/5 border border-border/50 rounded-xl px-3 text-[10px] font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none hover:bg-white/10"
                    value={selectedDate.year}
                    onChange={(e) => setSelectedDate(prev => ({ ...prev, year: e.target.value }))}
                  >
                    {[2023, 2024, 2025, 2026].map(year => (
                      <option key={year} value={year} className="bg-card">{year}</option>
                    ))}
                  </select>
                  <div className="absolute -right-1 -top-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <Calendar className="h-3 w-3 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-2 flex justify-end">
             <button 
              onClick={() => {
                setSelectedGroupIds(groups.map(g => g.id));
                setSelectedCategories([]);
                setSelectedDate({ month: new Date().getMonth() + 1, year: new Date().getFullYear() });
              }}
              className="text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors underline"
             >
               Reset Filters
             </button>
          </div>
        </div>

        {/* Group Consolidated Transaction Table */}
        <TransactionTableMini 
          transactions={filteredTransactions} 
          title="Group Activity Ledger"
          subtitle={`Viewing ${filteredTransactions.length} of ${transactions.length} movements`}
          columns={['paidBy', 'date', 'label', 'amount', 'groupName']}
          labels={{
            paidBy: "Who",
            date: "When",
            label: "Why",
            amount: "How much",
            groupName: "Group Name"
          }}
        />
      </div>

      <GroupModal 
        isOpen={isModalOpen}
        initialData={editingGroup}
        onClose={() => { setIsModalOpen(false); setEditingGroup(null); }}
        onSave={handleSaveGroup}
      />
    </AppLayout>
  );
};

export default GroupsPage;
