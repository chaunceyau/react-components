import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { FormInput, FormComponentProps } from '.'
import { Form } from '../..'

export default {
  title: 'Forms/FormInput',
  component: FormInput,
  decorators: [
    (Story: any) => (
      <Form onSubmit={() => {}} id='testForm123'>
        <Story />
      </Form>
    )
  ]
} as Meta

const Template: Story<FormComponentProps> = (args: any) => (
  <FormInput {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  label: 'First Name',
  name: 'firstName',
  placeholder: 'Provide your first name',
  registerOptions: { required: true }
}