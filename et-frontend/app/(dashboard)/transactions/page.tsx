import AddExpenseDialog from "@/components/templates/AddExpenseDialog";
import AdvancedExpenseTable from "@/components/templates/AdvancedExpenseTable";
import Title from "@/components/templates/Title";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="md:ml-[256px] p-8">
      <div className="flex justify-between items-center">
        <Title title="Expenses" />
        <AddExpenseDialog />
      </div>
      <div className="mt-8">
        <AdvancedExpenseTable />
      </div>
    </div>
  );
};

export default Page;
