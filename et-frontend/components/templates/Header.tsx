import React from "react";

type Props = {
  title: string;
};

const Header = (props: Props) => {
  return <h1 className="text-2xl font-bold">{props.title}</h1>;
};

export default Header;
