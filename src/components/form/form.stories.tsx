import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import {
  Form,
  FormButton,
  FormInput,
  FormRadioGroup,
  FormSelect,
  FormToggle,
  FormUpload
} from '../..'
import { FormProps } from '.'

export default {
  title: 'Forms/Form',
  component: Form
} as Meta

const Template: Story<FormProps> = (args: any) => <Form {...args} />
const children = (
  <>
    <FormInput
      name='firstName'
      label='First Name'
      registerOptions={{
        minLength: { value: 2, message: 'Length must be at least 2' },
        required: true
      }}
    />
    <FormInput
      name='lastName'
      label='Last Name'
      registerOptions={{ required: 'You must provide information' }}
    />
    <FormToggle
      name='allowNotifications'
      label='Allow Notifications'
      description='This will allow mobile phone notifications'
    />
    <FormRadioGroup
      name='subscriptionType'
      label='Subscription Type'
      options={[
        {
          id: '9ca87723-6c2c-434c-8572-0d64864825f6',
          value: 'Monthly Subscription',
          caption: '$5/mo'
        },
        {
          id: 'b5173512-423e-458d-b55c-151647652dc7',
          value: 'Yearly Subscription',
          caption: '$45/yr'
        }
      ]}
    />
    <FormUpload
      name='profilePhoto'
      label='Profile Photo'
      onDeleteMutation={() => {}}
      onUploadComplete={() => {}}
      multiple={true}
    />
    <FormSelect
      name='company'
      label='Company Name'
      options={[
        { id: 'kl402kc', value: 'Apple Inc' },
        { id: 'c340kc340', value: 'Google Inc' }
      ]}
    />
    <FormButton label='Save Information' />
  </>
)
const defaultValues = {
  firstName: 'austin',
  lastName: 'chauncey',
  allowNotifications: true,
  profilePhoto: [
    {
      id: '8cd306aa-9fe1-445b-bb45-56e49786a317',
      fileName: 'interesting.png',
      status: 'IDLE'
    },
    {
      id: '84282870-fbeb-47df-a05b-b5924586a634',
      fileName: 'another.pdf',
      status: 'IDLE'
    }
  ]
}

export const Basic = Template.bind({})
Basic.args = {
  children,
  defaultValues,
  id: 'form-unstyled',
  styled: false,
  title: 'Unstyled Form',
  description: 'This form has no added styling',
  onSubmit: () => {}
}

export const Styled = Template.bind({})
Styled.args = {
  children,
  defaultValues,
  id: 'form-styled',
  styled: true,
  title: 'Styled Form',
  description: 'This form has additional styling added',
  onSubmit: () => {}
}
