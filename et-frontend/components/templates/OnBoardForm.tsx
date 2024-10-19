"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { LoadingButton } from "../ui/loading-button";
import { useOnboard } from "@/lib/react-query/queries/useOnboard";

type Props = {};

const OnBoardForm = (props: Props) => {
  const router = useRouter();
  const { mutate: onboard, isPending } = useOnboard();
  const [expenseLimit, setExpenseLimit] = useState(0);
  const { user } = useUser();

  const handleSubmit = async (formData: FormData) => {
    if (!user) {
      router.replace("/sign-in");
      return;
    }

    if (!user.fullName || !user.emailAddresses[0].emailAddress) {
      router.replace("/sign-in");
      return;
    }

    const onboardData = {
      name: user.fullName,
      email: user.emailAddresses[0].emailAddress,
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
          className="w-full h-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
          id="expenseLimit"
          placeholder="Enter your monthly expense limit"
          onChange={(e) => setExpenseLimit(Number(e.target.value))}
        />
      </div>
      <LoadingButton type="submit" className="w-full h-12" loading={isPending}>
        Continue
      </LoadingButton>
    </form>
  );
};

export default OnBoardForm;
