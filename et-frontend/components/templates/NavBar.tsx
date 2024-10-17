import React from "react";
type Props = {};

const NavBar = (props: Props) => {
  return (
    <nav className="flex justify-between items-center p-4 bg-background border-b border-border sticky top-0 z-50">
      <h1 className="text-2xl font-bold">Expense Tracker</h1>
      <div className="flex gap-4">
      </div>
    </nav>
  );
};

export default NavBar;
