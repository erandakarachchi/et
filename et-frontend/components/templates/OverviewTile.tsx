import { cn } from "@/lib/utils";
import { PlusIcon } from "@radix-ui/react-icons";

type Props = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  variant?: "default" | "destructive";
};

const OverviewTile = (props: Props) => {
  return (
    <div className={cn("p-4 rounded-md border border-border", props.variant === "destructive" && "bg-destructive/20")}>
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium text-muted-foreground">{props.title}</p>
        {props.icon}
      </div>
      {props.children}
    </div>
  );
};

export default OverviewTile;
