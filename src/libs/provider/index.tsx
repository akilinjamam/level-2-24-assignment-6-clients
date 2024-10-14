"use client"
// import { AppWrapper } from "@/contextApi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const Providers = ({children} : {children: ReactNode}) => {

  const queryClient = new QueryClient();

  return (
      // <AppWrapper>
          <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
      // </AppWrapper>
  );
};

export default Providers;