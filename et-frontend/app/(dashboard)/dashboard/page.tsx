"use client";

import AddExpenseDialog from "@/components/templates/AddExpenseDialog";
import CategoryTable from "@/components/templates/CategoryTable";
import { TotalExpensesPerCategory } from "@/components/templates/CategoryTable";
import PieChartCard from "@/components/templates/PieChartCard";
import Title from "@/components/templates/Title";
import { useStatistics } from "@/lib/react-query/queries/useStatistics";
import { formatCurrency } from "@/lib/utils";
import { Wallet, Carrot, Layers3, ChartSpline, CircleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import StatsTile from "@/components/templates/StatsTile";

type Props = {};

const Page = (props: Props) => {
  const { data, isLoading } = useStatistics();
  const exceededLimit = data?.data.remainingPercentage && data?.data.remainingPercentage <= 10;
  return (
    <div className="md:ml-[256px] p-8">
      {/* Overview Tiles */}
      <section>
        <div className="flex justify-between items-center">
          <Title title="Monthly Overview" />
          <AddExpenseDialog />
        </div>
        {exceededLimit && (
          <section className="flex flex-col gap-4 mt-8">
            <Alert variant="destructive">
              <CircleAlert className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>You have exceeded your monthly spending limit.</AlertDescription>
            </Alert>
          </section>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
          <StatsTile
            isLoading={isLoading}
            title="Max Spending Limit"
            icon={<Wallet size={16} />}
            contentTitle={formatCurrency(data?.data.maxMonthlyExpenseLimit ?? 0)}
            contentDescription={`${data?.data.remainingPercentage}% from total remaining`}
          />
          <StatsTile
            isLoading={isLoading}
            title="Total Spent"
            icon={<Carrot size={16} />}
            contentTitle={`${data?.data.consumedPercentage}%`}
            contentDescription={`of ${formatCurrency(data?.data.maxMonthlyExpenseLimit ?? 0)} limit`}
            variant={exceededLimit ? "destructive" : "default"}
          />
          <StatsTile
            isLoading={isLoading}
            title="Top Category"
            icon={<Layers3 size={16} />}
            contentTitle={data?.data.topSpendingCategory.name ?? "N/A"}
            contentDescription={`${formatCurrency(data?.data.topSpendingCategory.totalExpenses ?? 0)} spent this month`}
          />
          <StatsTile
            isLoading={isLoading}
            title="Daily Average"
            icon={<ChartSpline size={16} />}
            contentTitle={formatCurrency(data?.data.dailyAverageExpense ?? 0)}
            contentDescription="based on this month"
          />
        </div>
      </section>
      {/* Charts and Recents */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <PieChartCard
          isLoading={isLoading}
          totalExpensesPerCategory={data?.data.totalExpensesPerCategory as TotalExpensesPerCategory[]}
        />
        <CategoryTable
          isLoading={isLoading}
          totalExpensesPerCategory={data?.data.totalExpensesPerCategory as TotalExpensesPerCategory[]}
        />
      </section>
    </div>
  );
};

export default Page;
