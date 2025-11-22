
import React, { useState } from 'react';
import PublicHome from './components/Public/Home';
import AdminDashboard from './components/Admin/Dashboard';
import { ViewMode } from './types';

const App: React.FC = () => {
  // In a real app, this would be handled by auth state
  const [viewMode, setViewMode] = useState<ViewMode>('PUBLIC');

  // Mobile-first container strategy
  // On desktop, we center the public app like a mobile view
  // The admin dashboard takes full width
  
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      {viewMode === 'PUBLIC' ? (
        <div className="flex justify-center h-screen bg-slate-100 overflow-hidden">
          {/* Simulating Mobile View on Desktop */}
          <div className="w-full max-w-md bg-white h-full shadow-2xl overflow-y-auto relative no-scrollbar">
            <PublicHome onLoginClick={() => setViewMode('ADMIN')} />
          </div>
        </div>
      ) : (
        <AdminDashboard onSwitchToPublic={() => setViewMode('PUBLIC')} />
      )}
    </div>
  );
};

export default App;
