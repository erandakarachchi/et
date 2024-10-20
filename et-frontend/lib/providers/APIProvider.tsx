"use client";
import { useSession } from "@clerk/nextjs";
import { useEffect, createContext, useContext, useState } from "react";
import { APIClient } from "../api/client";
import { usePathname } from "next/navigation";
import { RefreshCcw } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

export const APIContext = createContext<APIClient | null>(null);

export const useAPI = () => {
  const context = useContext(APIContext);
  if (context === null) {
    throw new Error("useAPI must be used within an APIProvider");
  }
  return context;
};

const APIProvider = ({ children }: Props) => {
  const { session } = useSession();
  const [apiClient, setApiClient] = useState<APIClient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  //   Loading screen won't show on home page, sign-in page and sign-up page
  const whitelistedPages = ["/", "/sign-in", "/sign-up"];

  useEffect(() => {
    const initializeApiClient = async () => {
      if (session) {
        setIsLoading(true);
        try {
          const fetchedToken = await session.getToken({ template: "custom-backend" });
          const newApiClient = new APIClient(fetchedToken);
          setApiClient(newApiClient);
        } catch (error) {
          console.error("Error initializing API client", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    initializeApiClient();
  }, [session]);

  return (
    <APIContext.Provider value={apiClient}>
      {(isLoading && !whitelistedPages.includes(pathname)) ? (
        <div className="h-screen flex flex-col items-center justify-center">
          <div className="text-center mb-8 flex flex-col items-center">
            <h1 className="text-lg lg:text-2xl font-bold">We're getting things ready for you...</h1>
            <RefreshCcw className="w-10 h-10 animate-spin mt-8" />
          </div>
        </div>
      ) : (
        children
      )}
    </APIContext.Provider>
  );
};

export default APIProvider;
