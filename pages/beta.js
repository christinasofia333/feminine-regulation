import { useState } from 'react';
import { useRouter } from 'next/router';

export default function BetaAccess() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'founder2026') {
      sessionStorage.setItem('beta-authenticated', 'true');
      router.push('/');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          💗 Feminine Regulation
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Beta Access
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
      </div>
      
      <style jsx global>{`
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
      `}</style>
    </div>
  );
}
