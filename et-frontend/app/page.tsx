"use client";

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
    <div>
      <h1>Expense Tracker</h1>
      <Button onClick={callApi}>Call API</Button>
    </div>
  );
}
