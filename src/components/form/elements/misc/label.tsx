import * as React from "react";

export interface FieldLabelProps {
  name: string;
  label: string;
  error: boolean;
}

export function FieldLabel({ name, label, error }: FieldLabelProps) {
  const classes = ["block text-sm font-bold mb-2"];

  classes.push(error ? "text-red-600" : "text-gray-700");

  return (
    <label htmlFor={name} className={classes.join(" ")}>
      {label}
    </label>
  );
}
