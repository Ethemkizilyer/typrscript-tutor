import { Wrapper } from "./App.style";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { changeCurrency } from "./features/appSlice";
import { useGetBitcoinDatQuery } from "./services";




const INTERVAL_TIME = 5000; // ms



// const getBCData = async ()=> {
//   try {
    
//     const data = await axios<BitcoinData, any>(
//       "https://blockchain.info/ticker"
//     );
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };



const App = () => {
  const { currency } = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();
  // const [currency, setCurrency] = useState<Currencies>(Currencies.USD);
  // const { data, isLoading, error } = useQuery<BitcoinData>(
  //   "bc-data",
  //   getBCData,
  //   {
  //     refetchInterval: 5000
  //   }
  // );
  const { data, isLoading, error } = useGetBitcoinDatQuery(undefined, {
    pollingInterval: INTERVAL_TIME
  });

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
