import React from 'react';

import './App.css';
import { useGetUsersQuery } from './service/app';

// https://fakestoreapi.com/products


function App() {
    const { data, isLoading, error } = useGetUsersQuery(undefined, {
    pollingInterval: 10000,
    });
    console.log(data)
  return (
    <div className="App">
    
    </div>
  );
}

export default App;
