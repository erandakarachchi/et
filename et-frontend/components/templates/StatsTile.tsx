import React from "react";
import OverviewTile from "./OverviewTile";
import { Skeleton } from "../ui/skeleton";

type Props = {
  isLoading: boolean;
  icon: React.ReactNode;
  title: string;
  contentDescription: string;
  contentTitle: string;
  variant?: "default" | "destructive";
};

const StatsTile = ({ isLoading, icon, title, contentDescription, contentTitle, variant = "default" }: Props) => {
  if (isLoading) {
    return (
      <OverviewTile title={title} icon={icon} variant={variant}>
        <Skeleton className="h-10 w-full" />
      </OverviewTile>
    );
  }

  return (
    <OverviewTile title={title} icon={icon} variant={variant}>
      <p className="text-md lg:text-xl font-bold mt-4 text-ellipsis">{contentTitle}</p>
      <p className="text-xs lg:text-xs text-muted-foreground mt-2 text-ellipsis">{contentDescription}</p>
    </OverviewTile>
  );
};

export default StatsTile;
