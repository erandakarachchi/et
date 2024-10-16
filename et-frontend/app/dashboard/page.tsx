import AddExpenseDialog from "@/components/templates/AddExpenseDialog";
import ExpensesTable from "@/components/templates/ExpensesTable";
import OverviewTile from "@/components/templates/OverviewTile";
import PieChartCard from "@/components/templates/PieChartCard";
import Title from "@/components/templates/Title";
import { Button } from "@/components/ui/button";
import { Wallet, Carrot, Layers3, ChartSpline } from "lucide-react";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="md:ml-[256px] p-8">
      {/* Overview Tiles */}
      <section>
        <div className="flex justify-between items-center">
          <Title title="Overview" />
          <AddExpenseDialog />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <OverviewTile title="Monthly Spending" icon={<Wallet size={16} />}>
            <p className="text-xl font-bold mt-4">LKR 8900.00</p>
            <p className="text-xs text-muted-foreground mt-2">
              12% from last month
            </p>
          </OverviewTile>
          <OverviewTile title="Budget Status" icon={<Carrot size={16} />}>
            <p className="text-xl font-bold mt-4">85%</p>
            <p className="text-xs text-muted-foreground mt-2">
              of LKR 10000.00 limit
            </p>
          </OverviewTile>
          <OverviewTile title="Top Category" icon={<Layers3 size={16} />}>
            <p className="text-xl font-bold mt-4">Food</p>
            <p className="text-xs text-muted-foreground mt-2">
              LKR 2500.00 spent this month
            </p>
          </OverviewTile>
          <OverviewTile title="Daily Average" icon={<ChartSpline size={16} />}>
            <p className="text-xl font-bold mt-4">LKR 254.00</p>
            <p className="text-xs text-muted-foreground mt-2">
              based on this month
            </p>
          </OverviewTile>
        </div>
      </section>
      {/* Charts and Recents */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <PieChartCard />
        <ExpensesTable />
      </section>
    </div>
  );
};

export default Page;
