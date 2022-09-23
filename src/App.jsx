import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css' 
import Menu from './componentes/Menu'
import Home from './componentes/Home'
import {BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import React from 'react';
import Disciplinas from './componentes/telas/disciplinas/Disciplinas';
import Professores from './componentes/telas/professores/Professores';

function App() {
  return (
    <Router>
      <Menu/>
      <Routes>
        <Route exact="true" path="/" element={<Home/>}/>
        <Route exact="true" path="/disciplinas" element={<Disciplinas/>}/>
        <Route exact="true" path="/professores" element={<Professores/>}/>
      </Routes>
    </Router>
  );
}

export default App;