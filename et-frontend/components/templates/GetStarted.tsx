import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {};

const GetStarted = (props: Props) => {
  const router = useRouter();

  const onGetStarted = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to Expense Tracker</h1>
      <p className="text-lg text-gray-500 mt-2">
        Expense Tracker is a simple app that helps you track your monthly
        expenses.
      </p>
      <Button className="mt-4" onClick={onGetStarted}>
        Get Started
      </Button>
    </div>
  );
};

export default GetStarted;
