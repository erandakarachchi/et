import AddExpenseDialog from "@/components/templates/AddExpenseDialog";
import ExpensesTable from "@/components/templates/ExpensesTable";
import Title from "@/components/templates/Title";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="md:ml-[256px] p-8">
      <div className="flex justify-between items-center">
        <Title title="Transactions" />
        <AddExpenseDialog />
      </div>
      <div className="mt-8">
        <ExpensesTable />
      </div>
    </div>
  );
};

export default Page;
