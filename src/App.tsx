
import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import NotesApp from '@/components/NotesApp';
import './App.css';

function App() {
  return (
    <main className="min-h-screen bg-background">
      <Toaster position="top-right" />
      <NotesApp />
    </main>
  );
}

export default App;
