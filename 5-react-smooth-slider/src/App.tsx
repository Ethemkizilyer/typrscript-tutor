import { useState } from "react";
import { useQuery } from "react-query";
import { Wrapper } from "./App.style";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrency } from "./features/appSlice";



export enum Currencies {
  ARS = "ARS",
  AUD = "AUD",
  BRL = "BRL",
  CAD = "CAD",
  CHF = "CHF",
  CLP = "CLP",
  CNY = "CNY",
  CZK = "CZK",
  DKK = "DKK",
  EUR = "EUR",
  GBP = "GBP",
  HKD = "HKD",
  HRK = "HRK",
  HUF = "HUF",
  INR = "INR",
  ISK = "ISK",
  JPY = "JPY",
  KRW = "KRW",
  NZD = "NZD",
  PLN = "PLN",
  RON = "RON",
  RUB = "RUB",
  SEK = "SEK",
  SGD = "SGD",
  THB = "THB",
  TRY = "TRY",
  TWD = "TWD",
  USD = "USD",
}

export type BitcoinData = {
  [key in Currencies]: {
    "15m": number;
    buy: number;
    last: string;
    sell: number;
    symbol: string;
  };
};




const getBCData = async ()=> {
  try {
    
    const data = await axios<BitcoinData, any>(
      "https://blockchain.info/ticker"
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};



const App = () => {
  const { currency } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  // const [currency, setCurrency] = useState<Currencies>(Currencies.USD);
  const { data, isLoading, error } = useQuery<BitcoinData>(
    "bc-data",
    getBCData,
    {
      refetchInterval: 5000,
    }
  );

  const handleCurrencySelection = (e: any) =>
    dispatch(changeCurrency(e.currentTarget.value));

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Something went horrible wrong ...</div>;

  return (
    <Wrapper>
      <>
        <h2>Bitcoin Price</h2>
        <select value={currency} onChange={handleCurrencySelection}>
          {data &&
            Object.keys(data).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
        </select>
        <div>
          <h2>
            {data && data[currency].symbol}
            {data && data[currency].last}
          </h2>
        </div>
      </>
    </Wrapper>
  );
};

export default App;
