import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import Ingestion from './Ingestion.tsx'
import Analysis from './Analysis.tsx'
import CodeExplorer from './CodeExplorer.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ingestion" element={<Ingestion />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/code-explorer" element={<CodeExplorer />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
