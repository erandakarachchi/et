import { PlusIcon } from "@radix-ui/react-icons";

type Props = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

const OverviewTile = (props: Props) => {
  return (
    <div className="p-4 rounded-md border border-border">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium text-muted-foreground">{props.title}</p>
        {props.icon}
      </div>
      {props.children}
    </div>
  );
};

export default OverviewTile;
