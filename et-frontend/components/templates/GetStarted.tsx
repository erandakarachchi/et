import { Button } from "../ui/button";
import { SignInButton } from "@clerk/nextjs";

type Props = {};

const GetStarted = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to Expense Tracker</h1>
      <p className="text-lg text-gray-500 mt-2">
        Expense Tracker is a simple app that helps you track your monthly expenses.
      </p>
      <SignInButton>
        <Button className="mt-4">Get Started</Button>
      </SignInButton>
    </div>
  );
};

export default GetStarted;
