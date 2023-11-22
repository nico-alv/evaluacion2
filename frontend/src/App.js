import logo from './logo.svg';
import './App.css';
import Products from './Products';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <Products/>
    </div>
  );
}

export default App;
