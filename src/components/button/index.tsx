import React from 'react'
import { LoadingSpinner } from '../misc/spinner'

export interface ButtonProps {
  label: string
  className?: string
  // TODO: should seperate loading/disabled to either or
  loading?: boolean
  disabled?: boolean
  // full-width?
  fluid?: boolean
  color?: ButtonColor
  type?: ButtonType // | 'reset'
  alignRight?: boolean
  //
  onClick?: () => void
}

type ButtonColor = 'primary' | 'default' | 'light'
type ButtonType = 'submit' | 'button'

export function Button(props: ButtonProps) {
  const btnClasses = getButtonClasses({
    color: props.color,
    fluid: props.fluid,
    loading: props.loading,
    disabled: props.disabled,
    className: props.className,
    alignRight: props.alignRight
  })

  const spinner = (
    <div className='absolute w-full h-full flex items-center justify-center -mt-2'>
      <LoadingSpinner color='white' />
    </div>
  )

  const buttonProps = getButtonProps({
    type: props.type,
    loading: props.loading,
    disabled: props.disabled,
    className: btnClasses.join(' '),
    onClick: props.type === 'button' ? props.onClick : null
  })

  return (
    <button {...buttonProps}>
      {props.loading ? spinner : null}
      {<span className={props.loading ? 'opacity-0' : ''}>{props.label}</span>}
    </button>
  )
}

function getButtonProps({
  type = 'button',
  className,
  disabled,
  loading,
  onClick
}: any) {
  const buttonProps = {
    type,
    className,
    disabled: loading || disabled
  }

  // type === "button"
  if (onClick) {
    Object.assign(buttonProps, { onClick: onClick })
  }

  return buttonProps
}

function getButtonClasses({
  color,
  fluid,
  loading,
  disabled,
  alignRight,
  className
}: Pick<
  ButtonProps,
  'color' | 'fluid' | 'loading' | 'disabled' | 'className' | 'alignRight'
>): string[] {
  const buttonBaseClasses = [
    // padding
    'py-2',
    'px-4',
    // border
    'border',
    'border-transparent',
    // flex
    'flex',
    'justify-center',
    // text
    'text-sm',
    'font-medium',
    // misc
    'shadow-sm',
    'rounded-md',
    // focus
    'focus:ring-2',
    'focus:outline-none',
    'focus:ring-offset-2',
    'focus:ring-indigo-500'
  ]

  switch (color) {
    case 'light': {
      buttonBaseClasses.push('bg-gray-200 text-gray-500')
      if (!disabled) {
        buttonBaseClasses.push('hover:bg-gray-300')
      }
      break
    }

    case 'default': {
      buttonBaseClasses.push('bg-gray-400 text-gray-600')
      if (!disabled) {
        buttonBaseClasses.push('hover:bg-gray-600')
      }
      break
    }

    case 'primary':
    default: {
      buttonBaseClasses.push('bg-indigo-600 text-white')
      if (!disabled) {
        buttonBaseClasses.push('hover:bg-indigo-700')
      }
      break
    }
  }

  if (alignRight) {
    buttonBaseClasses.push('ml-auto')
  }

  if (loading || disabled) {
    buttonBaseClasses.push('opacity-50', 'cursor-not-allowed', 'relative')
  }

  if (fluid) {
    buttonBaseClasses.push('w-full')
  }

  if (typeof className === 'string') {
    buttonBaseClasses.push(className)
  }

  return buttonBaseClasses
}

export function ButtonGroup({ children }: any) {
  return (
    <div className='flex space-x-2'>
      {React.Children.map(children, (child) => {
        if (child === null) {
          return null
        } else if (child.type !== Button) {
          throw new Error(
            `${child.type} is not a valid child of the ButtonGroup component.`
          )
        }
        return child
      })}
    </div>
  )
}
