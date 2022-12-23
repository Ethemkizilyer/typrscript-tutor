import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

 type Type={
  name:string,
  surname:string,
  age:number,
  city:string,
  id:string,
}

const BASE_URL = "https://63878fb8d9b24b1be3f44043.mockapi.io";


export const data = createApi({
  reducerPath: "users",
  baseQuery:fetchBaseQuery({baseUrl: BASE_URL}),
  endpoints:builder=>({
    getUsers:builder.query<Type,undefined>({
query:()=>"/words"
    }),
    contact:builder.query<Type,string>({
        query:(id)=>`/words/${id}`
    })
  })
});

export const {useGetUsersQuery,useContactQuery}=data