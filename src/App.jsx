import React from 'react';
import './global.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa o React Router
import { Header } from './components/HomePages/header/header.jsx';
import { Inicialize } from './components/HomePages/inicialize/inicialize.jsx';
import { Campeonato } from './components/Game/Campeonato/Campeonato.jsx'; // Importa o componente Campeonato

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Inicialize />} />  {/* Página inicial */}
        <Route path="/campeonato" element={<Campeonato />} /> {/* Página do Campeonato */}
      </Routes>
    </Router>
  );
}

export default App;


