/**
 * Service to handle AI Assistant logic via Groq API.
 * Manages message history and state persistence in localStorage.
 */
const aiAssistantService = {
  /**
   * Placeholder for Groq API Logic.
   * To use real API, fill the GROQ_API_KEY and use fetch to 'https://api.groq.com/openai/v1/chat/completions'.
   */
  GROQ_API_KEY: 'YOUR_GROQ_API_KEY_HERE',

  sendMessage: async (message, history = []) => {
    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock AI Response Logic (Replace with real Fetch for Groq)
    const response = {
      role: 'assistant',
      content: `I've analyzed your financial data. Based on your recent trends, you're currently spending about 15% more on dining than last month. I recommend setting a smaller budget for 'Food' to stay on track for your 'Goa Trip' goal.`,
      time: new RegExp('rent', 'i').test(message) ? 'Your rent is already accounted for in your fixed expenses.' : null
    };

    return response;
  },

  /**
   * Persists chat history to localStorage.
   */
  saveSession: (sessionId, messages) => {
    const existingSessions = JSON.parse(localStorage.getItem('prism_ai_sessions') || '{}');
    existingSessions[sessionId] = {
      id: sessionId,
      lastMessage: messages[messages.length - 1]?.content || '',
      timestamp: new Date().toISOString(),
      messages
    };
    localStorage.setItem('prism_ai_sessions', JSON.stringify(existingSessions));
  },

  /**
   * Retrieves all previous chat sessions.
   */
  getSessions: () => {
    const sessions = JSON.parse(localStorage.getItem('prism_ai_sessions') || '{}');
    return Object.values(sessions).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  getSession: (id) => {
    const sessions = JSON.parse(localStorage.getItem('prism_ai_sessions') || '{}');
    return sessions[id] || null;
  }
};

export default aiAssistantService;
