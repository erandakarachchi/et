import { SignIn } from "@clerk/nextjs";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default page;
