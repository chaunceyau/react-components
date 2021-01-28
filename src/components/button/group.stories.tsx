import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Button, ButtonProps } from '.'
import { ButtonGroup } from './group'
// import * as ButtonStories from './index.stories'

const Template: Story<ButtonProps> = (args) => <ButtonGroup {...args} />

export const Pair = Template.bind({})
Pair.args = {
  // label: 'ButtonGroup',
  // children: ButtonStories?.Primary?.args
}

export default {
  title: 'Group',
  component: ButtonGroup,
  decorators: [
    (Story: any) => (
      <Story>
        <Button color='default' label='Cancel' />
        <Button color='primary' label='Save Changes' />
      </Story>
    )
  ]
} as Meta
