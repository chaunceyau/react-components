import React from 'react'
import * as RHForm from 'react-hook-form'
import { FormLabel } from '../misc/label'

export interface FormComponentProps {
  name: string
  label: string
  placeholder?: string
  registerOptions?: RHForm.RegisterOptions
}

export const FormInput = (props: FormComponentProps) => {
  const ctx = RHForm.useFormContext()

  if (ctx === undefined) {
    throw new Error('FormInput must be rendered inside a Form component')
  }

  const styles = getFormInputStyles({
    loading: ctx.formState.isSubmitting,
    error: ctx.errors[props.name]
  })

  return (
    <div className={styles.textColor}>
      <FormLabel
        name={props.name}
        label={props.label}
        error={!!ctx.errors[props.name]}
      />
      <div className='relative rounded-md shadow-sm'>
        <input
          type='text'
          id={props.name}
          name={props.name}
          ref={ctx.register(props.registerOptions)}
          disabled={ctx.formState.isSubmitting}
          placeholder={props.placeholder}
          className={styles.inputBaseClasses.join(' ')}
          aria-describedby={props.name + '-error'}
          aria-invalid={!!ctx.errors[props.name]}
        />
      </div>
      {ctx.errors[props.name] ? (
        <InputErrorMessage
          name={props.name}
          message={ctx.errors[props.name]?.message}
        />
      ) : null}
    </div>
  )
}

function getFormInputStyles({ loading, error }: any) {
  let textColor = 'text-gray-700'

  const inputBaseClasses = [
    'border',
    'block',
    'w-full',
    'px-3 py-2',
    'pr-10',
    'sm:text-sm',
    'rounded-md',
    'focus:outline-none'
  ]

  if (loading) {
    inputBaseClasses.push('bg-gray-200 text-gray-400')
  } else {
    inputBaseClasses.push('bg-white')
  }

  if (typeof error === 'undefined') {
    inputBaseClasses.push(
      'border-gray-300',
      'placeholder-gray-300',
      'focus:ring-gray-500',
      'focus:border-indigo-500'
    )
  } else {
    inputBaseClasses.push(
      'border-red-400',
      'placeholder-red-300',
      'focus:ring-red-500',
      'focus:border-red-500'
    )
  }

  if (error) {
    textColor = 'text-red-600'
  }

  return {
    textColor,
    inputBaseClasses
  }
}

interface InputErrorMessageProps {
  message?: string
  name: string
}

function InputErrorMessage({ message, name }: InputErrorMessageProps) {
  return (
    <p className='mt-2 text-sm text-red-600' id={name + '-error'} role='alert'>
      {message || 'There is an issue with this input'}
    </p>
  )
}
