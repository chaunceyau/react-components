import * as React from "react";
import { Option } from "./option";

interface OptionSelectProps {
  active: string;
  options: {
    label: string;
    description: string;
  }[];
  onToggle: (label: string) => void;
}

export function OptionSelect(props: OptionSelectProps) {
  // const [active, setActive] = useState<string>(props.options[0].label);

  return (
    <fieldset>
      <legend className="sr-only">Privacy setting</legend>
      <div className="bg-white rounded-md -space-y-px">
        {props.options.map((opt) => (
          <Option
            key={opt.label}
            onToggle={props.onToggle}
            checked={props.active === opt.label}
            label={opt.label}
            description={opt.description}
          />
        ))}
      </div>
    </fieldset>
  );
}
