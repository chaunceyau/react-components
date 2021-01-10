import React from 'react'
import { useFormContext } from 'react-hook-form'

import { FormLabel } from '../misc/label'

interface FormOptionsProps {
  label: string
  options: FormOption[]
  // register?: any;
  // loading?: boolean;
  variableName: string
}

interface FormOption {
  id: string
  name: string
  description?: string
}

// TODO: a11y friendly
// generally < 5 choices
export function FormOptions(props: FormOptionsProps) {
  if (props.options.length === 0) {
    throw new Error('you must provide atleast one option')
  }

  return (
    <fieldset>
      <FormLabel name={props.label} label={props.label} error={false} />
      {/* <legend className="sr-only">Pricing plans</legend> */}
      <ul className='relative bg-white rounded-md -space-y-px'>
        {props.options.map((option, index) => (
          <Option
            variableName={props.variableName}
            key={option.id}
            value={option.name}
            isFirst={index === 0}
            isLast={index === props.options.length - 1}
            {...option}
          />
        ))}
      </ul>
    </fieldset>
  )
}

function Option(
  props: FormOption & {
    isFirst: boolean
    isLast: boolean
    variableName: string
    value: string
  }
) {
  const ctx = useFormContext()

  const wrapperClasses = [
    'relative border p-4 flex flex-col md:pl-4 md:pr-6 md:grid md:grid-cols-2'
  ]

  if (props.isFirst) {
    wrapperClasses.push('rounded-tl-md rounded-tr-md')
  }
  if (props.isLast) {
    wrapperClasses.push('rounded-bl-md rounded-br-md')
  }

  const inputClasses = [
    'focus:ring-indigo-500 h-4 w-4 cursor-pointer border-gray-300'
  ]
  const labelClasses = ['flex items-center text-sm']

  if (ctx.formState.isSubmitting) {
    wrapperClasses.push('bg-gray-200 text-gray-400')
    inputClasses.push('text-gray-400 cursor-not-allowed')
    labelClasses.push('cursor-not-allowed')
  } else {
    wrapperClasses.push('bg-white')
    inputClasses.push('text-indigo-600')
    labelClasses.push('cursor-pointer')
  }

  return (
    <li key={props.id}>
      {/* <!-- On: "bg-indigo-50 border-indigo-200 z-10", Off: "border-gray-200" --> */}
      <div className={wrapperClasses.join(' ')}>
        <label className={labelClasses.join(' ')}>
          <input
            type='radio'
            name={props.variableName}
            value={props.name}
            disabled={ctx.formState.isSubmitting}
            ref={ctx.register({ required: true })}
            className={inputClasses.join(' ')}
            aria-describedby='plan-option-pricing-0 plan-option-limit-0'
          />
          <span className='ml-3 font-medium'>{props.name}</span>
        </label>
        {/* <!-- On: "text-indigo-700", Off: "text-gray-500" --> */}
        <p
          id='plan-option-limit-0'
          className='ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right text-gray-500'
        >
          Up to 5 active job postings
        </p>
      </div>
    </li>
  )
}
