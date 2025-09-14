import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 30000,
      // suspense:true
    },
  },
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <QueryClientProvider client={client}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <ToastContainer />
      <App />
    </QueryClientProvider>
  </StrictMode>
);
