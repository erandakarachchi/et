"use client";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";
import React from "react";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TotalExpensesPerCategory } from "./CategoryTable";
import { Skeleton } from "../ui/skeleton";

type Props = {
  totalExpensesPerCategory: TotalExpensesPerCategory[];
  isLoading: boolean;
};

const PieChartCard = (props: Props) => {
  const { totalExpensesPerCategory, isLoading } = props;

  const chartData = React.useMemo(() => {
    if (isLoading) return [];

    return totalExpensesPerCategory.map((item, index) => ({
      name: item.name,
      totalExpenses: item.totalExpenses,
      fill: `hsl(var(--chart-${index + 1}))`,
    }));
  }, [totalExpensesPerCategory, isLoading]);

  const dynamicChartConfig = React.useMemo(() => {
    const config: Record<string, { label: string; color: string }> = {};
    chartData.forEach((item, index) => {
      config[item.name] = {
        label: item.name,
        color: `hsl(var(--chart-${index + 1}))`,
      };
    });
    return config;
  }, [chartData]);

  return (
    <div className="border rounded-md p-4 border-border">
      <h2 className="text-md lg:text-lg font-semibold mb-4">Expenses by Category</h2>
      {isLoading ? (
        <Skeleton className="w-full h-[250px]" />
      ) : (
        <ChartContainer config={dynamicChartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie className="text-xs" data={chartData} dataKey="totalExpenses" nameKey="name" />
            <ChartLegend className="text-xs flex flex-wrap gap-3 justify-center" content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      )}
    </div>
  );
};

export default PieChartCard;
