import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Home from './componentes/Home'
import {BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import React from 'react';
import Disciplinas from './componentes/telas/disciplinas/Disciplinas';
import Professores from './componentes/telas/professores/Professores';
import Login from "./componentes/telas/login/Login";
import MenuPublico from "./componentes/MenuPublico";
import MenuPrivado from "./componentes/MenuPrivado";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact="true" element={<MenuPublico/>}>
                    <Route index element={<Home />} />
                    <Route exact="true" path="/login" element={<Login/>} />
                </Route>

                <Route path="/privado" element={<MenuPrivado/>}>
                    <Route index element={<Home/>}/>
                    <Route exact="true" path="disciplinas" element={<Disciplinas/>}/>
                    <Route exact="true" path="professores" element={<Professores/>}/>
                    <Route exact="true" path="login" element={<Login/>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;