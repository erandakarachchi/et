import React from "react";
import OverviewTile from "./OverviewTile";

type Props = {
  icon: React.ReactNode;
  title: string;
  contentDescription: string;
  contentTitle: string;
  variant?: "default" | "destructive";
};

const StatsTile = ({ icon, title, contentDescription, contentTitle, variant = "default" }: Props) => {
  return (
    <OverviewTile title={title} icon={icon} variant={variant}>
      <p className="text-xl font-bold mt-4">{contentTitle}</p>
      <p className="text-xs text-muted-foreground mt-2">{contentDescription}</p>
    </OverviewTile>
  );
};

export default StatsTile;
