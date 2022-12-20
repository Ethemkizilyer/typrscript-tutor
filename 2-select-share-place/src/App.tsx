import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  console.log(process.env.REACT_APP_KEY);
  return (
    <div className="App">
     <div className="map">
      <p>Adresiniz giriniz...</p>
     </div>
     <form>
      <input type="text" id='address' />
      <button type='submit'>Ara</button>
     </form>
    </div>
  );
}

export default App;
