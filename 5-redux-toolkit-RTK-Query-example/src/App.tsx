import LinearProgress from "@mui/material/LinearProgress";
import React from "react";
import Box from "@mui/material/Box";
import "./App.css";
import { Type, useContactQuery, useGetUsersQuery } from "./service/app";

// https://fakestoreapi.com/products

const LinearIndeterminate = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );
};

function App() {
  const { data, isLoading, error, isSuccess } = useGetUsersQuery(undefined, {
    pollingInterval: 100000,
  });
  console.log(data);



  return (
    <div className="App">
      {isLoading && <LinearIndeterminate />}
      {isSuccess && (
        <div>
          {data.map((user) => (<div key={user.id}>
            <pre >{user.name}</pre>
            <span><Numero id={user.id}/></span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



export const Numero=({id}:{id:string})=>{
  const { data } = useContactQuery(id);
  return <pre>{JSON.stringify(data, undefined, 2)}</pre>
}



export default App;


