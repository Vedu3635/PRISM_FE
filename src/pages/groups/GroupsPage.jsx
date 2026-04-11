import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import FeatureHeader from '@/components/commonUI/FeatureHeader';
import TransactionTableMini from '@/components/commonUI/TransactionTableMini';
import groupService from '@/services/groupService/groupService';
import Loader from '@/components/commonUI/Loader';
import { Users, UserPlus, Share2, Plus, Info, ShieldCheck, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [invitationCode, setInvitationCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [groupsData, txData] = await Promise.all([
          groupService.getGroups(),
          groupService.getGroupTransactions('all')
        ]);
        setGroups(groupsData);
        setTransactions(txData);
      } catch (error) {
        console.error("Failed to load groups data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleJoinGroup = async () => {
    if (!invitationCode.trim()) return;
    setIsJoining(true);
    try {
      const newGroup = await groupService.joinGroup(invitationCode);
      setGroups([...groups, newGroup]);
      setInvitationCode('');
      alert(`Successfully joined ${newGroup.name}!`);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsJoining(false);
    }
  };

  const headerActions = [
    { label: 'Create Group', variant: 'primary', icon: Plus, onClick: () => alert('Create Group Clicked') },
    { label: 'Invite People', variant: 'secondary', icon: Mail, onClick: () => alert('Invite People Clicked') },
    { label: 'Manage Members', variant: 'secondary', icon: Info, onClick: () => alert('Manage Clicked') },
  ];

  if (isLoading) return <AppLayout><div className="h-[80vh] flex items-center justify-center"><Loader text="Preparing your collaborative ledgers..." /></div></AppLayout>;

  return (
    <AppLayout>
      <div className="space-y-10 pb-20 font-inter">
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
            <h3 className="text-lg font-black tracking-tight">Got an Invite?</h3>
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-0.5">Enter the invitation code to join your group</p>
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
                    <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
                      <ShieldCheck className="h-3 w-3 text-emerald-500" />
                      {group.members} Members
                    </div>
                  </div>
                </div>
                <button className="p-2 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-border/30 pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Settlement Balance</span>
                    <p className={cn(
                      "text-2xl font-black font-mono tracking-tighter",
                      group.balance > 0 ? "text-emerald-500" : group.balance < 0 ? "text-rose-500" : "text-foreground"
                    )}>
                      {group.balance > 0 && '+'}₹ {group.balance.toLocaleString('en-IN')}
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

        {/* Group Consolidated Transaction Table */}
        <TransactionTableMini 
          transactions={transactions} 
          title="Group Activity Ledger"
          subtitle="Consolidated view of all group movements"
          columns={['label', 'date', 'paidBy', 'amount']}
        />
      </div>
    </AppLayout>
  );
};

export default GroupsPage;
