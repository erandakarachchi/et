import React from "react";
import { SignUp } from "@clerk/nextjs";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignUp forceRedirectUrl={"/onboard"} />
    </div>
  );
};

export default Page;
