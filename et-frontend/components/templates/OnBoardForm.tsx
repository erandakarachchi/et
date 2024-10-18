"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { LoadingButton } from "../ui/loading-button";
import { useOnboard } from "@/lib/react-query/queries/useOnboard";

type Props = {};

const OnBoardForm = (props: Props) => {
  const router = useRouter();
  const { mutate: onboard, isPending } = useOnboard();
  const [expenseLimit, setExpenseLimit] = useState(0);

  const handleSubmit = async (formData: FormData) => {
    const onboardData = {
      name: "Sample User",
      email: "sample2@user.com",
      maxMonthlyExpenseLimit: expenseLimit,
    };
    onboard(onboardData, {
      onSuccess: () => {
        router.replace("/dashboard");
      },
    });
  };

  return (
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
          onChange={(e) => setExpenseLimit(Number(e.target.value))}
        />
      </div>
      <LoadingButton type="submit" className="w-full h-12" loading={isPending}>
        Get Started
      </LoadingButton>
    </form>
  );
};

export default OnBoardForm;
