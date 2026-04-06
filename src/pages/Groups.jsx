import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Modal from '../components/Modal';
import AddTransactionModal from '../components/modals/AddTransactionModal';
import { groupService } from '../services';

/* ═══════════════════════════════════════════════
   REUSABLE SUB-COMPONENTS
   ═══════════════════════════════════════════════ */

const InputField = ({ label, icon, ...props }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">{label}</label>
    <div className="relative">
      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">{icon}</span>
      <input
        className="w-full bg-surface h-11 rounded-md border border-white/10 text-white text-sm pl-11 pr-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50 transition-all font-body"
        {...props}
      />
    </div>
  </div>
);

const SelectField = ({ label, icon, options, ...props }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">{label}</label>
    <div className="relative">
      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">{icon}</span>
      <select
        className="w-full bg-surface h-11 rounded-md border border-white/10 text-white text-sm pl-11 pr-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body appearance-none cursor-pointer"
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">expand_more</span>
    </div>
  </div>
);

const EmptyState = ({ icon, title, sub, action, onAction }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="w-16 h-16 rounded-xl bg-surface-container-highest flex items-center justify-center mb-6 border border-white/5">
      <span className="material-symbols-outlined text-[28px] text-on-surface-variant">{icon}</span>
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-sm text-on-surface-variant mb-6 max-w-sm">{sub}</p>
    {action && (
      <button onClick={onAction} className="px-5 py-2.5 bg-primary text-black font-semibold rounded-md text-sm hover:bg-white transition-colors flex items-center gap-1.5">
        <span className="material-symbols-outlined text-[18px]">add</span>{action}
      </button>
    )}
  </div>
);

const Spinner = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-8 h-8 border-2 border-white/10 border-t-primary rounded-full animate-spin" />
  </div>
);

const TabButton = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
      active
        ? 'bg-white/10 text-white shadow-sm'
        : 'text-on-surface-variant hover:text-white hover:bg-white/5'
    }`}
  >
    {children}
  </button>
);

/* ═══════════════════════════════════════════════
   MODALS
   ═══════════════════════════════════════════════ */

const CreateGroupModal = ({ isOpen, onClose, onCreated }) => {
  const [form, setForm] = useState({ name: '', description: '', type: 'trip', currency: 'INR' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!form.name.trim()) { setError('Group name is required.'); return; }
    setLoading(true);
    setError('');
    try {
      const group = await groupService.create(form);
      onCreated(group);
      onClose();
      setForm({ name: '', description: '', type: 'trip', currency: 'INR' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create group.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Group"
      subtitle="Set up a new expense-splitting group."
      footerActions={
        <>
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-white transition-colors">Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className="px-5 py-2 bg-primary text-black font-semibold rounded-md text-sm hover:bg-white transition-colors disabled:opacity-50">
            {loading ? 'Creating…' : 'Create Group'}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        {error && <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-md text-red-500 text-sm text-center">{error}</div>}
        <InputField label="Group Name" icon="group" placeholder="e.g. Goa Trip 2026" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <InputField label="Description" icon="notes" placeholder="Optional description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <div className="grid grid-cols-2 gap-4">
          <SelectField label="Type" icon="category" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} options={[
            { value: 'trip', label: 'Trip' }, { value: 'home', label: 'Home' }, { value: 'couple', label: 'Couple' }, { value: 'other', label: 'Other' },
          ]} />
          <SelectField label="Currency" icon="currency_exchange" value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} options={[
            { value: 'INR', label: 'INR ₹' }, { value: 'USD', label: 'USD $' }, { value: 'EUR', label: 'EUR €' }, { value: 'GBP', label: 'GBP £' },
          ]} />
        </div>
      </div>
    </Modal>
  );
};

const EditGroupModal = ({ isOpen, onClose, group, onUpdated }) => {
  const [form, setForm] = useState({ name: '', description: '', type: '', currency: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (group) setForm({ name: group.name || '', description: group.description || '', type: group.type || 'trip', currency: group.currency || 'INR' });
  }, [group]);

  const handleSubmit = async () => {
    if (!form.name.trim()) { setError('Group name is required.'); return; }
    setLoading(true);
    setError('');
    try {
      const updated = await groupService.update(group.id, form);
      onUpdated(updated);
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update group.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Group" subtitle="Update group details."
      footerActions={
        <>
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-white transition-colors">Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className="px-5 py-2 bg-primary text-black font-semibold rounded-md text-sm hover:bg-white transition-colors disabled:opacity-50">
            {loading ? 'Saving…' : 'Save Changes'}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        {error && <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-md text-red-500 text-sm text-center">{error}</div>}
        <InputField label="Group Name" icon="group" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <InputField label="Description" icon="notes" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <div className="grid grid-cols-2 gap-4">
          <SelectField label="Type" icon="category" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} options={[
            { value: 'trip', label: 'Trip' }, { value: 'home', label: 'Home' }, { value: 'couple', label: 'Couple' }, { value: 'other', label: 'Other' },
          ]} />
          <SelectField label="Currency" icon="currency_exchange" value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} options={[
            { value: 'INR', label: 'INR ₹' }, { value: 'USD', label: 'USD $' }, { value: 'EUR', label: 'EUR €' }, { value: 'GBP', label: 'GBP £' },
          ]} />
        </div>
      </div>
    </Modal>
  );
};

const AddMemberModal = ({ isOpen, onClose, groupId, onAdded }) => {
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('member');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!userId.trim()) { setError('User ID is required.'); return; }
    setLoading(true);
    setError('');
    try {
      await groupService.addMember(groupId, { user_id: userId, role });
      onAdded();
      onClose();
      setUserId('');
      setRole('member');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add member.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Member" subtitle="Invite a user to this group."
      footerActions={
        <>
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-white transition-colors">Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className="px-5 py-2 bg-primary text-black font-semibold rounded-md text-sm hover:bg-white transition-colors disabled:opacity-50">
            {loading ? 'Adding…' : 'Add Member'}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        {error && <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-md text-red-500 text-sm text-center">{error}</div>}
        <InputField label="User ID" icon="person_add" placeholder="Enter user UUID" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <SelectField label="Role" icon="shield_person" value={role} onChange={(e) => setRole(e.target.value)} options={[
          { value: 'member', label: 'Member' }, { value: 'admin', label: 'Admin' },
        ]} />
      </div>
    </Modal>
  );
};

const ConfirmModal = ({ isOpen, onClose, title, message, onConfirm, loading, destructive }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title}
    footerActions={
      <>
        <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-white transition-colors">Cancel</button>
        <button onClick={onConfirm} disabled={loading} className={`px-5 py-2 font-semibold rounded-md text-sm transition-colors disabled:opacity-50 ${destructive ? 'bg-error text-white hover:brightness-110' : 'bg-primary text-black hover:bg-white'}`}>
          {loading ? 'Processing…' : 'Confirm'}
        </button>
      </>
    }
  >
    <p className="text-sm text-on-surface-variant leading-relaxed">{message}</p>
  </Modal>
);

/* ═══════════════════════════════════════════════
   GROUP DETAIL VIEW — TABS
   ═══════════════════════════════════════════════ */

const MembersTab = ({ groupId, members, onRefresh }) => {
  const [removing, setRemoving] = useState(null);

  const handleRemove = async (memberId) => {
    setRemoving(memberId);
    try {
      await groupService.removeMember(groupId, memberId);
      onRefresh();
    } catch { /* silent */ }
    setRemoving(null);
  };

  if (!members.length) return <EmptyState icon="group_off" title="No Members" sub="This group has no members yet." />;

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-4 px-4 py-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wider border-b border-white/5">
        <div className="w-10" />
        <div className="flex-1">User</div>
        <div className="w-28 hidden sm:block">Role</div>
        <div className="w-32 hidden md:block">Joined</div>
        <div className="w-10" />
      </div>
      {members.map((m) => (
        <div key={m.id} className="group flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-surface-container-high transition-colors">
          <div className="w-10 h-10 rounded-md bg-surface-container-highest flex items-center justify-center font-bold text-xs text-on-surface-variant uppercase border border-white/10">
            {(m.nickname || m.userID || '??').substring(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{m.nickname || m.userID}</p>
            <p className="text-[10px] text-on-surface-variant truncate mt-0.5">{m.userID}</p>
          </div>
          <div className="w-28 hidden sm:block">
            <span className={`px-2 py-1 rounded text-[10px] font-semibold uppercase tracking-wider ${
              m.role === 'admin' ? 'bg-primary/20 text-primary' : 'bg-surface-container-high text-on-surface-variant border border-white/5'
            }`}>{m.role}</span>
          </div>
          <div className="w-32 hidden md:block text-xs text-on-surface-variant">
            {m.joinedAt ? new Date(m.joinedAt).toLocaleDateString() : '—'}
          </div>
          <div className="w-10 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => handleRemove(m.id)}
              disabled={removing === m.id}
              className="p-1.5 rounded-md hover:bg-error/10 text-on-surface-variant hover:text-error transition-colors disabled:opacity-50"
              title="Remove member"
            >
              <span className="material-symbols-outlined text-[18px]">{removing === m.id ? 'hourglass_top' : 'person_remove'}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const TransactionsTab = ({ transactions, members, onAddClick }) => {
  if (!transactions.length) {
    return (
      <EmptyState 
        icon="receipt_long" 
        title="No Transactions" 
        sub="Group transactions will appear here." 
        action="Add Transaction"
        onAction={onAddClick}
      />
    );
  }

  // Create a map of IDs to nicknames for fast lookup
  const memberMap = (members || []).reduce((acc, m) => {
    acc[m.userID] = m.nickname || m.username || m.userID;
    acc[m.id] = m.nickname || m.username || m.userID;
    return acc;
  }, {});

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-4 px-4 py-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wider border-b border-white/5">
        <div className="w-10" />
        <div className="flex-1">Title</div>
        <div className="w-24 hidden sm:block">Category</div>
        <div className="w-28 hidden md:block">Date</div>
        <div className="w-28 text-right">Amount</div>
      </div>
      {transactions.map((tx) => (
        <div key={tx.id} className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-surface-container-high transition-colors">
          <div className="w-10 h-10 rounded-md bg-surface-container-highest flex items-center justify-center text-on-surface-variant border border-white/10">
            <span className="material-symbols-outlined text-[18px]">receipt</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{tx.title || 'Untitled'}</p>
            <p className="text-[10px] text-on-surface-variant mt-0.5 truncate">
              Paid by <span className="text-primary font-medium">{memberMap[tx.paidBy] || tx.paidBy || '—'}</span>
            </p>
          </div>
          <div className="w-24 hidden sm:block">
            <span className="px-2 py-1 bg-surface-container-high rounded border border-white/5 text-[10px] font-medium text-on-surface-variant">{tx.category || '—'}</span>
          </div>
          <div className="w-28 hidden md:block text-xs text-on-surface-variant">
            {tx.transactedAt || tx.transacted_at ? new Date(tx.transactedAt || tx.transacted_at).toLocaleDateString() : '—'}
          </div>
          <div className="w-28 text-right font-semibold text-sm tnum text-white">
            {tx.currency || '₹'}{Number(tx.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
        </div>
      ))}
    </div>
  );
};

const BalancesTab = ({ balances }) => {
  const entries = Object.entries(balances || {});
  if (!entries.length) return <EmptyState icon="account_balance_wallet" title="No Balances" sub="Balances will show once transactions are added." />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {entries.map(([userId, balance]) => {
        const amt = typeof balance === 'object' ? balance.net || balance.amount || 0 : Number(balance);
        const isPositive = amt >= 0;
        return (
          <div key={userId} className="bg-surface border border-white/5 p-5 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-md bg-surface-container-highest flex items-center justify-center font-bold text-xs text-on-surface-variant uppercase border border-white/10">
                {userId.substring(0, 2)}
              </div>
              <p className="text-sm font-semibold text-white truncate flex-1">{userId}</p>
            </div>
            <div className={`text-xl font-bold tnum ${isPositive ? 'text-primary' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}₹{amt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-[10px] text-on-surface-variant mt-1 uppercase tracking-wider font-semibold">
              {isPositive ? 'Gets back' : 'Owes'}
            </p>
          </div>
        );
      })}
    </div>
  );
};

const GoalsTab = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {[
      { title: 'Trip Emergency Fund', target: 50000, progress: 35000, icon: 'security' },
      { title: 'Activity Budget', target: 20000, progress: 12000, icon: 'explore' },
    ].map((g, i) => (
      <div key={i} className="bg-surface border border-white/5 p-5 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[20px]">{g.icon}</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">{g.title}</p>
            <p className="text-[10px] text-on-surface-variant mt-0.5">₹{g.progress.toLocaleString()} / ₹{g.target.toLocaleString()}</p>
          </div>
        </div>
        <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(g.progress / g.target) * 100}%` }} />
        </div>
        <p className="text-[10px] text-on-surface-variant mt-2 text-right font-semibold">{Math.round((g.progress / g.target) * 100)}% complete</p>
      </div>
    ))}
  </div>
);

const BudgetTab = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {[
      { category: 'Food & Dining', limit: 15000, spent: 8400, icon: 'restaurant' },
      { category: 'Transport', limit: 10000, spent: 6200, icon: 'directions_car' },
      { category: 'Shopping', limit: 8000, spent: 9100, icon: 'shopping_bag' },
    ].map((b, i) => {
      const pct = Math.min((b.spent / b.limit) * 100, 100);
      const over = b.spent > b.limit;
      return (
        <div key={i} className={`bg-surface border p-5 rounded-xl ${over ? 'border-error/30' : 'border-white/5'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${over ? 'bg-error/10' : 'bg-surface-container-highest'}`}>
              <span className={`material-symbols-outlined text-[20px] ${over ? 'text-error' : 'text-on-surface-variant'}`}>{b.icon}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{b.category}</p>
              <p className="text-[10px] text-on-surface-variant mt-0.5">₹{b.spent.toLocaleString()} / ₹{b.limit.toLocaleString()}</p>
            </div>
          </div>
          <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${over ? 'bg-error' : 'bg-primary'}`} style={{ width: `${pct}%` }} />
          </div>
          {over && <p className="text-[10px] text-error mt-2 font-semibold">⚠ Over budget by ₹{(b.spent - b.limit).toLocaleString()}</p>}
        </div>
      );
    })}
  </div>
);

/* ═══════════════════════════════════════════════
   GROUP DETAIL VIEW
   ═══════════════════════════════════════════════ */

const GroupDetail = ({ group, onBack, onGroupUpdated, onGroupDeleted }) => {
  const [tab, setTab] = useState('members');
  const [members, setMembers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [balances, setBalances] = useState({});
  const [loading, setLoading] = useState(true);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isAddTxOpen, setIsAddTxOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [m, t, b] = await Promise.all([
        groupService.getMembers(group.id).catch(() => []),
        groupService.getTransactions(group.id).catch(() => []),
        groupService.getBalances(group.id).catch(() => ({})),
      ]);
      setMembers(Array.isArray(m) ? m : []);
      setTransactions(Array.isArray(t) ? t : []);
      setBalances(b || {});
    } catch { /* silent */ }
    setLoading(false);
  }, [group.id]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleDelete = async () => {
    setActionLoading(true);
    try { await groupService.deleteGroup(group.id); onGroupDeleted(group.id); } catch { /* silent */ }
    setActionLoading(false);
  };

  const handleLeave = async () => {
    setActionLoading(true);
    try { await groupService.leave(group.id); onGroupDeleted(group.id); } catch { /* silent */ }
    setActionLoading(false);
  };

  const typeIcons = { trip: 'flight', home: 'home', couple: 'favorite', other: 'groups' };

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-md bg-surface-container border border-white/5 flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-surface-container-high transition-colors">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-white tracking-tight truncate">{group.name}</h1>
          <p className="text-xs text-on-surface-variant mt-0.5 truncate">{group.description || 'No description'}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsEditOpen(true)} className="p-2 rounded-md hover:bg-white/5 text-on-surface-variant hover:text-white transition-colors" title="Edit">
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
          <button onClick={() => setIsLeaveOpen(true)} className="p-2 rounded-md hover:bg-white/5 text-on-surface-variant hover:text-white transition-colors" title="Leave">
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </button>
          <button onClick={() => setIsDeleteOpen(true)} className="p-2 rounded-md hover:bg-error/10 text-on-surface-variant hover:text-error transition-colors" title="Delete">
            <span className="material-symbols-outlined text-[20px]">delete</span>
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Type', value: group.type || '—', icon: typeIcons[group.type] || 'category' },
          { label: 'Currency', value: group.currency || '—', icon: 'currency_exchange' },
          { label: 'Members', value: members.length, icon: 'group' },
          { label: 'Transactions', value: transactions.length, icon: 'receipt_long' },
        ].map((s, i) => (
          <div key={i} className="bg-surface-container border border-white/5 p-4 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded border border-white/10 bg-surface-container-highest flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">{s.icon}</span>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">{s.label}</p>
              <p className="text-sm font-semibold text-white mt-0.5 tnum capitalize">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Invite Code */}
      {group.inviteCode && (
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-md bg-primary/20 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-[20px]">link</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Invite Code</p>
            <p className="text-sm font-bold text-white font-mono mt-0.5 truncate">{group.inviteCode}</p>
          </div>
          <button onClick={() => navigator.clipboard.writeText(group.inviteCode)} className="px-3 py-1.5 bg-white text-black text-xs font-semibold rounded-md hover:bg-neutral-200 transition-colors shrink-0">
            Copy
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-surface-container border border-white/5 rounded-xl overflow-hidden">
        <div className="flex items-center gap-1 p-2 border-b border-white/5 bg-surface-container-low overflow-x-auto">
          {['members', 'transactions', 'balances', 'goals', 'budgets'].map((t) => (
            <TabButton key={t} active={tab === t} onClick={() => setTab(t)}>{t.charAt(0).toUpperCase() + t.slice(1)}</TabButton>
          ))}
          {tab === 'members' && (
            <button onClick={() => setIsAddMemberOpen(true)} className="ml-auto px-3 py-1.5 bg-primary text-black text-xs font-semibold rounded-md hover:bg-white transition-colors flex items-center gap-1 shrink-0">
              <span className="material-symbols-outlined text-[16px]">person_add</span>Add
            </button>
          )}
          {tab === 'transactions' && (
            <button onClick={() => setIsAddTxOpen(true)} className="ml-auto px-3 py-1.5 bg-primary text-black text-xs font-semibold rounded-md hover:bg-white transition-colors flex items-center gap-1 shrink-0">
              <span className="material-symbols-outlined text-[16px]">add</span>Add
            </button>
          )}
        </div>

        <div className="p-4">
          {loading ? <Spinner /> : (
            <>
              {tab === 'members' && <MembersTab groupId={group.id} members={members} onRefresh={loadData} />}
              {tab === 'transactions' && <TransactionsTab transactions={transactions} members={members} onAddClick={() => setIsAddTxOpen(true)} />}
              {tab === 'balances' && <BalancesTab balances={balances} />}
              {tab === 'goals' && <GoalsTab />}
              {tab === 'budgets' && <BudgetTab />}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <EditGroupModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} group={group} onUpdated={onGroupUpdated} />
      <AddMemberModal isOpen={isAddMemberOpen} onClose={() => setIsAddMemberOpen(false)} groupId={group.id} onAdded={loadData} />
      <AddTransactionModal isOpen={isAddTxOpen} onClose={() => { setIsAddTxOpen(false); loadData(); }} initialGroupId={group.id} />
      <ConfirmModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Delete Group" message={`Are you sure you want to delete "${group.name}"? This action is irreversible.`} onConfirm={handleDelete} loading={actionLoading} destructive />
      <ConfirmModal isOpen={isLeaveOpen} onClose={() => setIsLeaveOpen(false)} title="Leave Group" message={`Are you sure you want to leave "${group.name}"? Admins must transfer ownership first.`} onConfirm={handleLeave} loading={actionLoading} />
    </div>
  );
};

/* ═══════════════════════════════════════════════
   GROUPS LIST VIEW
   ═══════════════════════════════════════════════ */

const GroupCard = ({ group, onClick }) => {
  const typeIcons = { trip: 'flight', home: 'home', couple: 'favorite', other: 'groups' };
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-surface-container border border-white/5 p-5 rounded-xl hover:bg-surface-container-high transition-colors group"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
          <span className="material-symbols-outlined text-primary text-[24px]">{typeIcons[group.type] || 'groups'}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white mb-1 truncate">{group.name}</h3>
          <p className="text-[11px] text-on-surface-variant line-clamp-2">{group.description || 'No description'}</p>
        </div>
        <span className="material-symbols-outlined text-on-surface-variant/30 text-[20px] mt-1 group-hover:text-white/50 transition-colors">chevron_right</span>
      </div>
      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/5">
        <span className="px-2 py-0.5 bg-surface-container-high rounded text-[10px] font-semibold text-on-surface-variant tracking-wider border border-white/5 capitalize">{group.type || '—'}</span>
        <span className="text-[10px] text-on-surface-variant font-medium">{group.currency || '—'}</span>
        {group.inviteCode && (
          <span className="ml-auto text-[10px] text-primary font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">link</span>{group.inviteCode}
          </span>
        )}
      </div>
    </button>
  );
};

/* ═══════════════════════════════════════════════
   MAIN GROUPS PAGE
   ═══════════════════════════════════════════════ */

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [error, setError] = useState('');

  const loadGroups = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await groupService.getUserGroups();
      setGroups(Array.isArray(data) ? data : []);
    } catch {
      // Fallback to /groups if /users/groups fails
      try {
        const data = await groupService.list();
        setGroups(Array.isArray(data) ? data : []);
      } catch {
        setError('Failed to load groups.');
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadGroups(); }, [loadGroups]);

  const handleGroupCreated = (newGroup) => {
    setGroups((prev) => [newGroup, ...prev]);
  };

  const handleGroupUpdated = (updated) => {
    setGroups((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
    setSelectedGroup(updated);
  };

  const handleGroupDeleted = (id) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
    setSelectedGroup(null);
  };

  // ── Group Detail View ──
  if (selectedGroup) {
    return (
      <div className="max-w-7xl mx-auto">
        <GroupDetail
          group={selectedGroup}
          onBack={() => setSelectedGroup(null)}
          onGroupUpdated={handleGroupUpdated}
          onGroupDeleted={handleGroupDeleted}
        />
      </div>
    );
  }

  // ── Groups List View ──
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Groups</h1>
          <p className="text-xs text-on-surface-variant mt-1">Manage your expense-splitting groups.</p>
        </div>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 bg-primary text-black font-semibold rounded-md text-xs hover:bg-white transition-colors flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>New Group
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Groups', value: groups.length, icon: 'groups' },
          { label: 'Active', value: groups.filter((g) => g.isActive !== false).length, icon: 'check_circle' },
          { label: 'Trip', value: groups.filter((g) => g.type === 'trip').length, icon: 'flight' },
          { label: 'Home', value: groups.filter((g) => g.type === 'home').length, icon: 'home' },
        ].map((s, i) => (
          <div key={i} className="bg-surface-container border border-white/5 p-4 rounded-xl flex items-center gap-4 transition-colors hover:bg-surface-container-high cursor-default">
            <div className="w-10 h-10 rounded border border-white/10 bg-surface-container-highest flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">{s.icon}</span>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">{s.label}</p>
              <p className="text-sm font-semibold text-white mt-0.5 tnum">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm text-center">{error}</div>
      )}

      {loading ? (
        <Spinner />
      ) : groups.length === 0 ? (
        <div className="bg-surface-container border border-white/5 rounded-xl">
          <EmptyState
            icon="group_add"
            title="No groups yet"
            sub="Create your first group to start splitting expenses with friends and family."
            action="Create Group"
            onAction={() => setIsCreateOpen(true)}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((g) => (
            <GroupCard key={g.id} group={g} onClick={() => setSelectedGroup(g)} />
          ))}
        </div>
      )}

      {/* Create Modal */}
      <CreateGroupModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onCreated={handleGroupCreated} />
    </div>
  );
};

export default Groups;
