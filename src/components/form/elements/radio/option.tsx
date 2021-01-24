import React from 'react'
import { useFormContext } from 'react-hook-form'
export interface FormOption {
  id: string
  value: string
  // more description info
  extraDescription?: string
}

export function FormRadioOption(
  props: FormOption & {
    variableName: string
  }
) {
  const ctx = useFormContext()

  if (ctx === undefined) {
    throw new Error('FormRadioOption must be rendered inside a Form component')
  }

  const wrapperClasses = [
    'relative border p-4 flex flex-col md:pl-4 md:pr-6 md:grid md:grid-cols-2',
    'first:rounded-t-md last:rounded-b-md'
  ]

  const inputClasses = [
    'focus:ring-indigo-500 h-5 w-5 cursor-pointer border-gray-300'
  ]
  const labelClasses = ['flex items-center text-sm']
  const descriptionClasses = ['ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right']

  if (ctx.formState.isSubmitting) {
    labelClasses.push('cursor-not-allowed')
    descriptionClasses.push('text-gray-400')
    wrapperClasses.push('bg-gray-200 text-gray-400')
    inputClasses.push('text-gray-400 cursor-not-allowed')
  } else {
    wrapperClasses.push('bg-white')
    labelClasses.push('cursor-pointer')
    inputClasses.push('text-indigo-600')
    descriptionClasses.push('text-gray-500')
  }

  {
    /* <!-- On: "bg-indigo-50 border-indigo-200 z-10", Off: "border-gray-200" --> */
  }

  console.log({ props })

  return (
    <li key={props.id} className={wrapperClasses.join(' ')}>
      <label className={labelClasses.join(' ')} htmlFor={props.id}>
        <input
          type='radio'
          id={props.id}
          value={props.id}
          name={props.variableName}
          disabled={ctx.formState.isSubmitting}
          ref={ctx.register({ required: true })}
          className={inputClasses.join(' ')}
          aria-describedby='plan-option-pricing-0 plan-option-limit-0'
        />
        <span className='ml-3 font-medium w-full'>{props.value}</span>
      </label>
      {/* <!-- On: "text-indigo-700", Off: "text-gray-500" --> */}
      {props.extraDescription ? (
        <p id='plan-option-limit-0' className={descriptionClasses.join(' ')}>
          {props.extraDescription}
        </p>
      ) : null}
    </li>
  )
}
