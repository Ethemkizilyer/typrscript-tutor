
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App";

const client = new QueryClient();

// React Query, genellikle React için eksik veri getirme kitaplığı olarak tanımlanır, ancak daha teknik terimlerle, React uygulamalarınızda sunucu durumunun alınmasını, önbelleğe alınmasını, senkronize edilmesini ve güncellenmesini çok kolaylaştırır.

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>
);
