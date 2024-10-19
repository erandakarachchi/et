"use client";

import AddExpenseDialog from "@/components/templates/AddExpenseDialog";
import ExpensesTable, { TotalExpensesPerCategory } from "@/components/templates/ExpensesTable";
import OverviewTile from "@/components/templates/OverviewTile";
import PieChartCard from "@/components/templates/PieChartCard";
import Title from "@/components/templates/Title";
import { useStatistics } from "@/lib/react-query/queries/useStatistics";
import { Wallet, Carrot, Layers3, ChartSpline } from "lucide-react";

type Props = {};

const Page = (props: Props) => {
  const { data, isLoading } = useStatistics();

  return (
    <div className="md:ml-[256px] p-8">
      {/* Overview Tiles */}
      <section>
        <div className="flex justify-between items-center">
          <Title title="Overview" />
          <AddExpenseDialog />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <OverviewTile title="Max Spending Limit" icon={<Wallet size={16} />}>
            <p className="text-xl font-bold mt-4">{data?.data.maxMonthlyExpenseLimit} LKR</p>
            <p className="text-xs text-muted-foreground mt-2">{data?.data.remainingPercentage}% from total remaining</p>
          </OverviewTile>
          <OverviewTile title="Total Spent" icon={<Carrot size={16} />}>
            <p className="text-xl font-bold mt-4">{data?.data.consumedPercentage}%</p>
            <p className="text-xs text-muted-foreground mt-2">of LKR {data?.data.maxMonthlyExpenseLimit} limit</p>
          </OverviewTile>
          <OverviewTile title="Top Category" icon={<Layers3 size={16} />}>
            <p className="text-xl font-bold mt-4">{data?.data.topSpendingCategory.name}</p>
            <p className="text-xs text-muted-foreground mt-2">
              LKR {data?.data.topSpendingCategory.totalExpenses} spent this month
            </p>
          </OverviewTile>
          <OverviewTile title="Daily Average" icon={<ChartSpline size={16} />}>
            <p className="text-xl font-bold mt-4"> {data?.data.dailyAverageExpense}.00 LKR</p>
            <p className="text-xs text-muted-foreground mt-2">based on this month</p>
          </OverviewTile>
        </div>
      </section>
      {/* Charts and Recents */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <PieChartCard />
        <ExpensesTable
          isLoading={isLoading}
          totalExpensesPerCategory={data?.data.totalExpensesPerCategory as TotalExpensesPerCategory[]}
        />
      </section>
    </div>
  );
};

export default Page;
