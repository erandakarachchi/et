"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./react-query/queryClient";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default Providers;
