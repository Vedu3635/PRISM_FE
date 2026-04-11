import React, { useState, useEffect, useRef } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import FeatureHeader from '@/components/commonUI/FeatureHeader';
import aiAssistantService from '@/services/aiAssistantService/aiAssistantService';
import { 
  Send, Sparkles, Brain, Clock, 
  Trash2, Plus, MessageSquare, 
  User, Bot, RefreshCcw, MoreHorizontal,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';

const AIAssistantPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const loadSessions = () => {
    const list = aiAssistantService.getSessions();
    setSessions(list);
  };

  const startNewChat = () => {
    setMessages([]);
    setActiveSessionId(null);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const loadSession = (id) => {
    const session = aiAssistantService.getSession(id);
    if (session) {
      setMessages(session.messages);
      setActiveSessionId(id);
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = { role: 'user', content: input, timestamp: new Date().toISOString() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await aiAssistantService.sendMessage(input, messages);
      const updatedMessages = [...newMessages, { ...response, timestamp: new Date().toISOString() }];
      setMessages(updatedMessages);

      // Handle session persistence
      const sessionId = activeSessionId || `session_${Date.now()}`;
      aiAssistantService.saveSession(sessionId, updatedMessages);
      setActiveSessionId(sessionId);
      loadSessions();
    } catch (error) {
       console.error("AI Error:", error);
       setMessages([...newMessages, { role: 'assistant', content: "I'm sorry, I encountered an error connecting to Groq. Please check your API key.", type: 'error' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-140px)] gap-6 overflow-hidden relative">
        
        {/* Chat History Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="absolute lg:relative z-20 w-80 h-full bg-card/50 backdrop-blur-xl border border-border/50 rounded-[40px] flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-border/30">
                <button 
                  onClick={startNewChat}
                  className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-black text-sm flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
                >
                  <Plus className="h-4 w-4" /> New Conversation
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4 px-2">Previous Chats</p>
                {sessions.map(session => (
                  <button
                    key={session.id}
                    onClick={() => loadSession(session.id)}
                    className={cn(
                      "w-full p-4 rounded-2xl text-left border flex flex-col gap-1 transition-all group",
                      activeSessionId === session.id 
                        ? "bg-white/10 border-primary/30" 
                        : "bg-transparent border-transparent hover:bg-white/5"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className={cn("h-3 w-3", activeSessionId === session.id ? "text-primary": "text-muted-foreground")} />
                        <span className="text-xs font-black truncate max-w-[140px]">{session.lastMessage || 'New Chat'}</span>
                      </div>
                      <span className="text-[8px] font-bold text-muted-foreground uppercase">{new Date(session.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Chat Interface */}
        <div className="flex-1 flex flex-col bg-card/30 backdrop-blur-md border border-border/50 rounded-[40px] overflow-hidden relative">
          
          {/* Header */}
          <header className="p-6 border-b border-border/30 flex items-center justify-between bg-card/50">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-xl hover:bg-white/5 lg:hidden"
              >
                <MoreHorizontal className="h-5 w-5" />
              </button>
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tighter">PRISM AI</h2>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Powered by Groq</span>
                </div>
              </div>
            </div>
          </header>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar scroll-smooth"
          >
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto">
                <div className="p-8 rounded-[40px] bg-primary/5 border border-primary/20">
                  <Sparkles className="h-16 w-16 text-primary animate-pulse" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tighter mb-2">How can I help you today?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    I can analyze your spending, suggest budget optimizations, or help you plan your next financial goal.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-2 w-full">
                  <button onClick={() => setInput("Calculate my burn rate for this month")} className="p-4 rounded-2xl border border-border/50 bg-white/5 hover:bg-white/10 text-left text-xs font-bold transition-all">
                    "Calculate my burn rate for this month"
                  </button>
                  <button onClick={() => setInput("How much can I save for my Goa trip?")} className="p-4 rounded-2xl border border-border/50 bg-white/5 hover:bg-white/10 text-left text-xs font-bold transition-all">
                    "How much can I save for my Goa trip?"
                  </button>
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex gap-4",
                  msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className={cn(
                  "h-10 w-10 shrink-0 rounded-2xl flex items-center justify-center border",
                  msg.role === 'user' ? "bg-white/5 border-border/50" : "bg-primary/10 border-primary/20 text-primary"
                )}>
                  {msg.role === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                </div>
                <div className={cn(
                  "max-w-[80%] p-5 rounded-[28px] text-sm leading-relaxed",
                  msg.role === 'user' 
                    ? "bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/10" 
                    : "bg-white/5 border border-border/50 font-medium"
                )}>
                  {msg.content}
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-2xl bg-primary/10 border border-primary/20 animate-pulse flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div className="p-5 rounded-[28px] bg-white/5 border border-border/50 flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce delay-75" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce delay-150" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce delay-225" />
                </div>
              </div>
            )}
          </div>

          {/* Sticky Input Bar */}
          <div className="p-8 shrink-0">
            <div className="max-w-4xl mx-auto relative group">
              <textarea
                rows="1"
                placeholder="Ask PRISM anything about your finances..."
                className="w-full bg-white/5 border-2 border-border/30 rounded-[32px] px-8 py-5 pr-20 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all scrollbar-hide text-sm font-bold resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className={cn(
                  "absolute right-3 top-3 bottom-3 aspect-square rounded-2xl flex items-center justify-center transition-all",
                  input.trim() ? "bg-primary text-primary-foreground shadow-xl scale-100" : "bg-white/5 text-muted-foreground scale-90"
                )}
              >
                {isTyping ? <RefreshCcw className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </button>
            </div>
            <p className="text-[10px] text-center mt-4 font-bold text-muted-foreground uppercase tracking-widest opacity-40">
              PRISM AI can provide generic financial insights. Verify critical decisions locally.
            </p>
          </div>

        </div>
      </div>
    </AppLayout>
  );
};

export default AIAssistantPage;
