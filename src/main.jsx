import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from "react-router";
import './index.css';
import App from './App.jsx';
import "./Fonts/F1/Formula1-Regular_web_0.ttf"
import "./Fonts/F1/Formula1-Bold_web_0.ttf"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)
