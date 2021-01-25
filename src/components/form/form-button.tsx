import React from 'react'
import { Button, ButtonProps } from '../button'

interface FormButtonProps extends Omit<ButtonProps, 'onClick' | 'type'> {}

export function FormButton(props: FormButtonProps) {
  return <Button {...props} type='submit' />
}
