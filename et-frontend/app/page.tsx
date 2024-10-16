"use client";

import GetStarted from "@/components/templates/GetStarted";
import { Button } from "@/components/ui/button";

export default function Home() {
  const callApi = async () => {
    const response = await fetch(
      "https://mvku1vlwcg.execute-api.us-east-1.amazonaws.com/prod/hello"
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="absolute inset-0 -z-10 size-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <GetStarted />
    </div>
  );
}
