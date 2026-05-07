/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import OnboardingModal from './components/OnboardingModal';
import { Smile } from 'lucide-react';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [completedData, setCompletedData] = useState(null);

  const handleComplete = (data) => {
    setCompletedData(data);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      {!isModalOpen && (
        <div className="text-center bg-white p-12 rounded-3xl shadow-xl max-w-2xl w-full border border-emerald-100">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Smile className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to the Family!</h1>
          <p className="text-gray-600 mb-8 max-w-sm mx-auto">
            Your business <strong>{completedData?.businessName || 'Food Business'}</strong> is ready to shine with FoodSpot.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
            {Object.entries(completedData || {}).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-emerald-600 font-bold mb-1">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="text-sm font-medium text-gray-800">{value || 'Not provided'}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              setCompletedData(null);
              setIsModalOpen(true);
            }}
            className="mt-10 px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 uppercase tracking-widest text-sm"
          >
            Create account
          </button>
        </div>
      )}

      <OnboardingModal
        isOpen={isModalOpen}
        onComplete={handleComplete}
      />
    </div>
  );
}
