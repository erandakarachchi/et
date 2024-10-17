"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const expenseLimit = formData.get("expenseLimit");
    console.log("Expense Limit:", expenseLimit);
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-8 gap-14">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-bold">Welcome to Expense Tracker</h1>
        <p className="text-lg text-gray-500 mt-2">Please enter monthly expense limit to get started.</p>
      </div>
      <form action={handleSubmit} className="lg:w-1/3 md:w-1/2 w-full flex flex-col gap-6 mt-8">
        <div className="flex flex-col gap-2">
          <Label className="text-md font-semibold" htmlFor="expenseLimit">
            Monthly Expense Limit
          </Label>
          <Input
            required
            className="w-full h-12"
            type="number"
            id="expenseLimit"
            placeholder="Enter your monthly expense limit"
          />
        </div>

        <Button type="submit" className="w-full h-12">
          Get Started
        </Button>
      </form>
    </div>
  );
};

export default Page;
