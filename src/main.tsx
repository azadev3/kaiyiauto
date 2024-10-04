import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import ScrollToTop from "./ScrollToTop.tsx";
import localforage from "localforage";
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'

const ONE_DAY = 1000 * 60 * 60 * 24;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_DAY,
      refetchOnWindowFocus: false,
      gcTime: ONE_DAY, 
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: localforage,
});

persistQueryClient({
  queryClient,
  persister: asyncStoragePersister,
  maxAge: ONE_DAY, 
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <BrowserRouter>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </RecoilRoot>
  </QueryClientProvider>
);
