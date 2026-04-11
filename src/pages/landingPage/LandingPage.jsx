import React from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/commonUI/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        {/* Background Gradients */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500/10 rounded-full blur-[128px] pointer-events-none" />
        
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
              PRISM
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">
              The next-generation financial management platform designed for clarity, security, and growth.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="rounded-full px-8 text-lg font-semibold">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/analytics">
                <Button size="lg" variant="outline" className="rounded-full px-8 text-lg font-semibold">
                  See Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="h-8 w-8 text-yellow-500" />}
              title="Lightning Fast"
              description="Analyze your financial data in real-time with our optimized analytics engine."
            />
            <FeatureCard 
              icon={<Shield className="h-8 w-8 text-green-500" />}
              title="Military-Grade Security"
              description="Your data is encrypted and protected by industry-leading security protocols."
            />
            <FeatureCard 
              icon={<BarChart3 className="h-8 w-8 text-blue-500" />}
              title="Deep Insights"
              description="Gain meaningful perspectives on your spending and investment habits."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} PRISM Financial. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-8 rounded-2xl border border-border bg-card shadow-sm transition-all"
  >
    <div className="mb-4 p-3 rounded-xl bg-background inline-block">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </motion.div>
);

export default LandingPage;
