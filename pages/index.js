import { useState, useEffect } from 'react';

export default function Home() {
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [passwordInput, setPasswordInput] = useState('');
const [error, setError] = useState('');

 useEffect(() => {
    // Check if already authenticated in this session
    if (sessionStorage.getItem('authenticated') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === 'regulatedbeta2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('authenticated', 'true');
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            💗 Feminine Regulation
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Beta Access Only
          </p>
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter beta password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-400 to-pink-400 text-white font-semibold py-3 rounded-lg hover:from-rose-500 hover:to-pink-500 transition"
            >
              Access Tool
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-6 text-center">
            Want beta access? DM @christinasofia on Instagram
          </p>
        </div>
      </div>
    );
  }  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey beautiful 💫 I'm here to support you through the hard moments—mind, body, heart, and soul. What's going on right now?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Take a deep breath with me. Place your hand on your heart. You're exactly where you need to be. 💫"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <div className="bg-white border-b border-rose-200 p-4 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-purple-400 rounded-full flex items-center justify-center">
            <span className="text-2xl">💗</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Feminine Regulation</h1>
            <p className="text-sm text-gray-600">Mind • Body • Heart • Soul Healing</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-lg rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-rose-400 to-pink-400 text-white'
                  : 'bg-white text-gray-800 shadow-sm border border-rose-100'
              }`}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-rose-100">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border-t border-rose-200 p-4 shadow-lg">
        <div className="max-w-3xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Share what's on your heart..."
            className="flex-1 px-4 py-3 rounded-full border border-rose-200 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-rose-400 to-pink-400 text-white px-6 py-3 rounded-full hover:from-rose-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Send
          </button>
        </div>
      </div>

      <div className="bg-purple-50 border-t border-purple-200 p-3">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-purple-600">
            ✨ Educational wellness tool • Not therapy • Crisis? Call 988
          </p>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
      `}</style>
    </div>
  );
}
