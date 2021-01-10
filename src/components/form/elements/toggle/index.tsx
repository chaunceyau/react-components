import React from 'react'
import { Controller } from 'react-hook-form'
import { FormLabel } from '../misc/label'

interface FormToggleProps {
  name: string
  label: string
  description?: string
}

export function FormToggle(props: FormToggleProps) {
  return (
    <Controller
      name={props.name}
      render={({ onChange, value }) => (
        <Toggle {...props} value={value} onChange={onChange} />
      )}
    />
  )
}

function Toggle({
  name,
  label,
  description,
  value,
  onChange
}: FormToggleProps & {
  value: boolean
  onChange: (isActive: boolean) => void
}) {
  const btnClasses = [
    'relative inline-flex flex-shrink-0',
    'h-6 w-10',
    'border-2 border-transparent',
    'rounded-full cursor-pointer',
    'transition-colors ease-in-out duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
  ]

  const circleClasses = [
    'h-5 w-5',
    'inline-block rounded-full bg-white shadow',
    'transform ring-0 transition ease-in-out duration-200'
  ]

  btnClasses.push(value ? 'bg-indigo-600' : 'bg-gray-200')
  circleClasses.push(value ? 'translate-x-4' : 'translate-x-0')

  return (
    <div className='flex flex-col justify-between'>
      <span className='flex-grow flex justify-between items-end' id={name}>
        <FormLabel name={name} label={label} error={false} />
        <button
          type='button'
          aria-pressed={value}
          className={btnClasses.join(' ')}
          onClick={() => onChange(!value)}
        >
          <span className='sr-only'>Use setting</span>
          <span aria-hidden={!value} className={circleClasses.join(' ')}></span>
        </button>
      </span>
      <div className='-mt-1 rounded-lg flex items-end justify-between'>
        {description ? (
          <span className='text-sm leading-normal text-gray-700 tracking-wide'>
            {description}
          </span>
        ) : null}
      </div>
    </div>
  )
}
