import LinearProgress from "@mui/material/LinearProgress";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import "./App.css";
import { Type, useContactQuery, useGetUsersQuery } from "./service/app";

// RTK Sorgusu, bir web uygulamasında veri yüklemek için yaygın durumları basitleştirmek üzere tasarlanmış, gelişmiş bir veri alma ve önbelleğe alma aracıdır.
// RTK Sorgusu, Redux Toolkit çekirdeği üzerine inşa edilmiştir ve yeteneklerini uygulamak için RTK'nın createSlice ve createAsyncThunk gibi API'lerinden yararlanır.
// RTK Sorgusu,eklenti olarak @reduxjs/toolkit paketine dahildir. Redux Toolkit'i kullandığınızda RTK Query API'lerini kullanmanız gerekmez


const LinearIndeterminate = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );
};

function App() {
  const [pollingInterval, setPollingInterval] = useState(0);
  const { data, isLoading, error, isSuccess, isFetching } = useGetUsersQuery(
    undefined,
    {
      pollingInterval: pollingInterval,
    }
  );
  // console.log(data);



  return (
    <div className="App">
      {isLoading && <LinearIndeterminate />}
      <select
        onChange={(change) => setPollingInterval(Number(change.target.value))}
      >
        <option value={0}>Off</option>
        <option value={1000}>1s</option>
        <option value={5000}>5s</option>
      </select>
      {isSuccess && (
        <div>
          {data.map((user) => (
            <div key={user.id}>
              <pre>
                {user.name} {isFetching && "🤦‍♂️"}
              </pre>
              <span>
                <Numero id={user.id} />
              </span>
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


