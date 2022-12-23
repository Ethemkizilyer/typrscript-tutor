import {configureStore} from "@reduxjs/toolkit"
import { data } from "./service/app"


export const store = configureStore({
  reducer: {
    // Oluşturulan küçültmeyi belirli bir üst düzey dilim olarak ekleyin
    [data.reducerPath]: data.reducer,
  },
  // Apı ara katman yazılımının eklenmesi önbelleğe alma, geçersiz kılma, yoklama sağlar,
  // ve  diğer kullanışlı özelliği 'rtk-query'
middleware:(getDefaultMiddleware)=>
getDefaultMiddleware().concat(data.middleware)
});

