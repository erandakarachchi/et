import { UserButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

type Props = {
  onMenuClick: () => void;
};

const NavBar = (props: Props) => {
  return (
    <nav className="flex justify-between items-center p-4 bg-background border-b border-border sticky top-0 z-50">
      <h1 className="text-2xl font-bold">Expense Tracker</h1>
      <div className="flex gap-4">
        <Button className="md:hidden" variant="outline" size="icon" onClick={props.onMenuClick}>
          <Menu />
        </Button>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default NavBar;
