import React from "react";

type Props = {
  title: string;
};

const Title = (props: Props) => {
  return <p className="text-2xl font-bold text-foreground">{props.title}</p>;
};

export default Title;
