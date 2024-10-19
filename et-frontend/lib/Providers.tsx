"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./react-query/queryClient";
import { ClerkProvider } from "@clerk/nextjs";
import APIProvider from "./providers/APIProvider";
type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ClerkProvider>
  );
};

export default Providers;
