

import { Label } from "@radix-ui/react-label";
import React from "react";
import { Input } from "../ui/input";

type Props = {
  label: string;
  placeholder: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputWithLabel = ({ label, placeholder, id, value, onChange }: Props) => {

  return (
    <div className="grid gap-1">
      <Label className="text-sm font-semibold" htmlFor="description">
        {label}
      </Label>
      <Input className="h-10" id={id} value={value} placeholder={placeholder} onChange={onChange}/>
    </div>
  );
};

export default InputWithLabel;
