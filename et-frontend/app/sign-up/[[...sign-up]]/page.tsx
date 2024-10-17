import { SignUp } from "@clerk/nextjs";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignUp />
    </div>
  );
};

export default page;
