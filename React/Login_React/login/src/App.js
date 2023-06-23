import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={< Login />} />
          <Route path='/dashboard' element={< Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
