'use client';
import { useState } from 'react';
import { useShopify } from '@shopify/shopify-app-remix/react'; // We'll install this later
export default function Home() {
  const { session } = useShopify();
  const [optimizing, setOptimizing] = useState(false);
  const [status, setStatus] = useState('');
  const optimizeAll = async () => {
    if (!session) {
      setStatus('Connect your Shopify store first!');
      return;
    }
    setOptimizing(true);
    setStatus('Optimizing your products... This takes 2-5 minutes.');
  try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shop: session.shop }),
      });
      if (response.ok) {
        setStatus('Done! Check your product pages — rankings improve in 1-2 weeks 🚀');
      } else {
        setStatus('Something went wrong. Try again?');
      }
    } catch (error) {
      setStatus('Error: ' + error.message);
    }
    setOptimizing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">RankRocket ⚡</h1>
        <p className="text-lg text-gray-600 mb-8">
          One-click AI to rewrite your product pages and steal the #1 Google spot.
        </p>
        <button
          onClick={optimizeAll}
          disabled={optimizing || !session}
          className="w-full bg-blue-600 text-white py-4 px-8 rounded-lg text-xl font-semibold hover:bg-blue-700 disabled:opacity-50 mb-4"
        >
          {optimizing ? 'Working magic...' : 'Optimize All My Products NOW →'}
        </button>
        {status && <p className="text-sm text-gray-500 mt-4">{status}</p>}
        <p className="text-xs text-gray-400 mt-6">
          30-day free trial • $49/mo after • Cancel anytime
        </p>
      </div>
    </div>
  );
}
