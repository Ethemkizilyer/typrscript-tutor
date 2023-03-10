import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BitcoinData } from "./bitcoinTypes";
// Types


const BASE_URL = "https://blockchain.info";

export const bitcoinApi = createApi({
  reducerPath: "bitcoinApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getBitcoinDat: builder.query<BitcoinData, undefined>({
      query: () => "/ticker",
    }),
  }),
});

export const { useGetBitcoinDatQuery } = bitcoinApi;
