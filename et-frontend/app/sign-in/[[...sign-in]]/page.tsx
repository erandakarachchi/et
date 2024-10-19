import React from "react";
import { SignIn } from "@clerk/nextjs";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignIn forceRedirectUrl={"/dashboard"} />
    </div>
  );
};

export default Page;
