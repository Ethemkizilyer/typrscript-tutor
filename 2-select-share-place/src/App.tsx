import React, { useRef, useState } from 'react';

import './App.css';
import axios from 'axios';

interface Goggle{
results:{geometry:{location:{lat:number,lng:number}}}[],
status:"OK" | "ZERO_RESULTS" 
}

function App() {
  const [asd,setAsd]= useState("")
const textRef = React.useRef<HTMLInputElement | null>();

  // console.log(process.env.REACT_APP_KEY);
const searchSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
  e.preventDefault()
  // let asd:string | ""=textRef.current?.value
  console.log(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
      asd
    )}&key=${process.env.REACT_APP_KEY}`
  );
};



  return (
    <div className="App">
      <div className="map">
        <p>Adresiniz giriniz...</p>
      </div>
      <form onSubmit={searchSubmit}>
        <input onChange={(e)=>setAsd(e.target.value)}  type="text" id="address" />
        <button type="submit">Ara</button>
      </form>
    </div>
  );
}

export default App;
