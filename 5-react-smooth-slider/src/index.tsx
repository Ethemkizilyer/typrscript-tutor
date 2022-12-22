import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "@fontsource/roboto";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "./store";

const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
<QueryClientProvider client={client}>
  <App />
</QueryClientProvider>
</Provider>
);
