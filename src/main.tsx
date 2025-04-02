import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "./ScrollToTop.tsx";
import { HelmetProvider } from "react-helmet-async";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <BrowserRouter>
        <ScrollToTop>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </ScrollToTop>
      </BrowserRouter>
    </RecoilRoot>
  </QueryClientProvider>
);
