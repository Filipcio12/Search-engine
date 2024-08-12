import './App.css';
import Homepage from './pages/homepage';
import SearchPage from './pages/searchpage';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/search" element={<SearchPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
