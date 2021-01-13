import * as React from "react";
import { Button } from "../../../button";

interface FormSubmitButtonProps {
  loading?: boolean;
}

export function FormSubmitButton(props: FormSubmitButtonProps) {
  return <Button loading={props.loading} label="Submit" type="submit" />;
}
