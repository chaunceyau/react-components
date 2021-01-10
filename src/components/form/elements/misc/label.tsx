import * as React from "react";

export interface FormLabelProps {
  name: string;
  label: string;
  error: boolean;
}

export function FormLabel({ name, label, error }: FormLabelProps) {
  const classes = ["block text-sm font-bold mb-2 tracking-wide"];

  classes.push(error ? "text-red-600" : "text-gray-800");

  return (
    <label htmlFor={name} className={classes.join(" ")}>
      {label}
    </label>
  );
}
