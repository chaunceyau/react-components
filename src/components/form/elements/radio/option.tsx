import React from "react"

interface OptionProps {
  checked: boolean
  label: string
  description: string
  onToggle: (label: string) => void
}

export function Option({ checked, label, description, onToggle }: OptionProps) {
  const wrapperClasses = [
    "first:rounded-t-md",
    "last:rounded-b-md",
    "relative",
    "border",
    "border-gray-300",
    "p-4",
    "flex",
  ]
  const labelClasses = ["block", "text-sm", "font-medium"]
  const descriptionClasses = ["block", "text-sm"]

  if (checked) {
    labelClasses.push("text-indigo-900")
    descriptionClasses.push("text-indigo-600")
    wrapperClasses.push("bg-indigo-100", "border-indigo-200", "z-10")
  } else {
    labelClasses.push("text-gray-900")
    wrapperClasses.push("border-gray-200")
    descriptionClasses.push("text-gray-500")
  }

  return (
    <div className={wrapperClasses.join(" ")}>
      <div className="flex items-center h-5">
        <input
          id={label}
          name={label}
          type="radio"
          checked={checked}
          onChange={() => onToggle(label)}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 cursor-pointer border-gray-300"
          aria-describedby="plan-option-pricing-0 plan-option-limit-0" />
      </div>
      <label htmlFor={label} className="ml-3 flex flex-col cursor-pointer">
        <span className={labelClasses.join(" ")}>{label}</span>
        <span className={descriptionClasses.join(" ")}>{description}</span>
      </label>
    </div>
  )
}
