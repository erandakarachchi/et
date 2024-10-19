"use client";
import { useSession } from "@clerk/nextjs";
import { useEffect, createContext, useContext, useState } from "react";
import { APIClient } from "../api/client";

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

  useEffect(() => {
    const initializeApiClient = async () => {
      if (session) {
        setIsLoading(true);
        try {
          const fetchedToken = await session.getToken();
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
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-2xl font-bold">We're getting things ready for you...</h1>
        </div>
      ) : (
        children
      )}
    </APIContext.Provider>
  );
};

export default APIProvider;
