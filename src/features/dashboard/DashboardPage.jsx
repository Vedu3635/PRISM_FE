import React, { useState } from 'react';
import AddTransactionModal from '../../components/modals/AddTransactionModal';
import CreateBudgetModal from '../../components/modals/CreateBudgetModal';
import CreateGoalModal from '../../components/modals/CreateGoalModal';
import { PageShell, MotionReveal } from '../../shared/ui';
import HeroStats from './components/HeroStats';
import QuickActionsHub from './components/QuickActionsHub';
import NetWorthProjector from './components/NetWorthProjector';
import IntelligencePanel from './components/IntelligencePanel';
import SnapshotCards from './components/SnapshotCards';

const DashboardPage = () => {
  const [isTxOpen, setIsTxOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [isGoalOpen, setIsGoalOpen] = useState(false);

  // Dynamic placeholders for future API binding
  const netWorth = 1245890.34;
  const mtDChange = 12450.0;
  const inflows = 42500;
  const outflows = 18200;

  return (
    <PageShell>
      <MotionReveal>
        <HeroStats
          netWorth={netWorth}
          mtDChange={mtDChange}
          inflows={inflows}
          outflows={outflows}
        >
          <QuickActionsHub
            onOpenTransaction={() => setIsTxOpen(true)}
            onOpenBudget={() => setIsBudgetOpen(true)}
            onOpenGoal={() => setIsGoalOpen(true)}
          />
        </HeroStats>
      </MotionReveal>

      <AddTransactionModal isOpen={isTxOpen} onClose={() => setIsTxOpen(false)} />
      <CreateBudgetModal
        isOpen={isBudgetOpen}
        onClose={() => setIsBudgetOpen(false)}
      />
      <CreateGoalModal isOpen={isGoalOpen} onClose={() => setIsGoalOpen(false)} />

      <MotionReveal delay={0.05}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <NetWorthProjector />
          <IntelligencePanel />
        </div>
      </MotionReveal>

      <MotionReveal delay={0.1}>
        <SnapshotCards />
      </MotionReveal>
    </PageShell>
  );
};

export default DashboardPage;

