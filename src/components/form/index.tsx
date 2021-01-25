import React from 'react'
import { toast } from 'react-hot-toast'
import * as RHForm from 'react-hook-form'
//
import { Toasts } from '../misc/toasts'
import { FormInput } from './elements/input'
import { FormToggle } from './elements/toggle'
import { FormUpload } from './elements/upload'
import { FormRadioGroup, FormRadioGroupProps } from './elements/radio'
import { FormSubmitButton } from './elements/misc/submit'
import { FormSelect } from './elements/select'
import { FormButton } from './form-button'
import { FormDivider } from './elements/divider'

interface FormProps {
  // children: React.ReactNode | React.ReactNode[];
  title?: string
  styled?: boolean
  description?: string
  clearValuesOnSubmit?: boolean
  children: React.ReactElement | React.ReactElement[]
  defaultValues?: { [key: string]: any }
  saveMessage?: string
  // UPDATE
  // onSubmit:;
  onSubmit: (data: any) => void | Promise<void>
}

// TODO: am i using formsubmitbutton?
const ValidFormComponents: any = [
  FormInput,
  FormUpload,
  FormToggle,
  FormButton,
  FormSelect,
  FormDivider,
  FormRadioGroup,
  FormSubmitButton
]

function validateChildrenAndInitializeOptionForm(
  children: React.ReactElement | React.ReactElement[],
  defaultValues?: { [key: string]: any }
) {
  React.Children.map(children, (child) => {
    // make sure valid child
    if (!ValidFormComponents.includes(child.type)) {
      // fn = "Error: function FormHeader({ ...etc }) { }"
      const fn: string = child.type.toString()
      const firstParenthesisIndex = fn.indexOf('(')
      // 9 = "function ".length
      const componentName: string = fn.slice(9, firstParenthesisIndex)
      throw new Error(
        `${componentName} is not a valid child of the Form component.`
      )
    }
    // add default values if not provided for options
    switch (child.type) {
      case FormRadioGroup: {
        const props: FormRadioGroupProps = child.props

        const noDefaultValueForRadioGroup =
          !defaultValues || !defaultValues[props.name]

        // default to first value
        if (noDefaultValueForRadioGroup) {
          Object.assign(defaultValues, {
            [props.name]: props.options[0].id
          })
        }
      }
    }
  })
}

export function Form({
  onSubmit: _onSubmit,
  children,
  title,
  description,
  styled,
  clearValuesOnSubmit,
  defaultValues
}: FormProps) {
  //
  validateChildrenAndInitializeOptionForm(children, defaultValues)

  const methods = RHForm.useForm({ defaultValues })
  const { handleSubmit, reset, setValue, formState } = methods

  const onSubmit = async (data: any) => {
    const isFunctionAsync = _onSubmit.constructor.name === 'AsyncFunction'

    let deleteFiles: { [key: string]: string[] } = {}

    React.Children.forEach(children, async (child) => {
      if (child.type === FormUpload) {
        deleteFiles[child.props.name] = data[child.props.name].reduce(
          (acc: any, val: any) => {
            return val.status === 'PENDING_REMOVAL' ? acc.concat(val.id) : acc
          },
          []
        )
      }
    })

    try {
      for (const [, value] of Object.entries(deleteFiles)) {
        await new Promise((res) =>
          setTimeout(() => {
            res(value)
          }, 500)
        )
      }

      await _onSubmit(data)

      for (const [key, deletes] of Object.entries<any>(deleteFiles)) {
        setValue(
          key,
          data[key].filter(
            (val: any) => !deletes.some((d: string) => d === val.id)
          )
        )
      }

      if (clearValuesOnSubmit) {
        reset()
      }

      if (isFunctionAsync) {
        toast.success('successfully submitted your info')
      }
    } catch (err) {
      if (isFunctionAsync) {
        toast.error(err)
      }
    }
  }

  // const button = React.Children.toArray(children).find(
  //   (child: any) => child.type === FormButton
  // )
  // <Button
  //         loading={formState.isSubmitting}
  //         label={saveMessage || 'Save'}
  //         type='submit'
  //       />
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styled ? 'border rounded-t-lg bg-white py-6 px-8' : ''}>
        {title ? <FormHeader title={title} description={description} /> : null}
        <div className='flex flex-col space-y-4 py-6'>
          <RHForm.FormProvider {...methods}>
            {React.Children.map(children, (child) => {
              switch (child.type) {
                case FormButton: {
                  return (
                    <div
                      className={
                        styled
                          ? 'bg-gray-100 py-4 px-8 rounded-b-lg border border-t-0 flex justify-end'
                          : 'pt-2'
                      }
                    >
                      {React.cloneElement(child, {
                        loading: formState.isSubmitting
                      })}
                    </div>
                  )
                }
                default:
                  return child
              }
            })}
          </RHForm.FormProvider>
        </div>
      </div>

      <Toasts />
    </form>
  )
}

interface FormHeaderProps {
  title: string
  description?: string
}

function FormHeader({ title, description }: FormHeaderProps) {
  return (
    <div>
      <h3 className='text-lg leading-6 font-medium text-gray-900'>{title}</h3>
      {description ? (
        <p className='mt-1 text-sm text-gray-500'>{description}</p>
      ) : null}
    </div>
  )
}
