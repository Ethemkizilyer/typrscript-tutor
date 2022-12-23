import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export interface Type {
  name:string,
  surname:string,
  age:number,
  city:string,
  id:string,
}

const BASE_URL = "https://63878fb8d9b24b1be3f44043.mockapi.io";

//URL yi ve beklenen bitiş noktalarını kullanarak(endpoints) bir hizmet tanımlayın
export const data = createApi({
  reducerPath: "users",
  baseQuery:fetchBaseQuery({baseUrl: BASE_URL}),
  endpoints:builder=>({
    getUsers:builder.query<Type[],undefined>({
query:()=>"/words"
    }),
    contact:builder.query<Type,string>({
        query:(id)=>`/words/${id}`
    })
  })
});
// Componentlerde kullanım için oluşturulan hookları dışa aktarın. 
// tanımlanan uç noktalara(endpoints) göre otomatik olarak oluşturuldu
export const {useGetUsersQuery,useContactQuery}=data