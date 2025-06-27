import { createRoot } from 'react-dom/client';
import React from 'react';
//Components
import { App } from './App';
import { Bubbles } from './components/Bubbles';
//Contexts
import { ModeProvider } from './context/ModeContext';
import { HistoryProvider } from './context/HistoryContext';
import { CalculatorProvider } from './context/CalculatorContext';
//Style
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CalculatorProvider>
      <HistoryProvider>
        <ModeProvider>
          <App />
        </ModeProvider>
      </HistoryProvider>
    </CalculatorProvider>
  </React.StrictMode>
);

createRoot(document.getElementById('background')).render(<Bubbles />);
