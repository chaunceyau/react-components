import React from 'react'

import { FormLabel } from '../misc/label'
import { FormOption, FormRadioOption } from './option'

interface FormRadioGroupProps {
  label: string
  options: FormOption[]
  variableName: string
}

// TODO: a11y friendly
export function FormRadioGroup(props: FormRadioGroupProps) {
  if (props.options.length === 0) {
    throw new Error('you must provide atleast one option')
  }

  return (
    <fieldset>
      <FormLabel name={props.label} label={props.label} error={false} />
      <legend className='sr-only'>{props.label}</legend>
      <ul className='relative bg-white rounded-md -space-y-px shadow-sm'>
        {props.options.map((option, index) => (
          <FormRadioOption
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
