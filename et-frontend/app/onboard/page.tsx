import OnBoardForm from "@/components/templates/OnBoardForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-8 gap-14">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-bold">Welcome to Expense Tracker</h1>
        <p className="text-lg text-gray-500 mt-2">Please enter monthly expense limit to get started.</p>
      </div>
      <OnBoardForm />
    </div>
  );
};

export default Page;
