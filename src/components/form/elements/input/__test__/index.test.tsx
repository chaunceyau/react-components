import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { act, fireEvent, render, wait } from '@testing-library/react'
//
import { FormInput } from '..'
import { Form } from '../../..'
import { FormButton } from '../../../form-button'
// , fireEvent

beforeEach(() => {
  require('mutationobserver-shim')
})

const mockHandleSubmit = jest.fn()

test('form input correctly submits', async () => {
  const component = render(
    <Form
      id='form1'
      onSubmit={mockHandleSubmit}
      // onSubmit={() => mockHandleSubmit()}
      defaultValues={{ testInput: '12' }}
    >
      <FormInput name='testInput' label='Test Input' />
      <FormButton label='test submit' />
    </Form>
  )

  fireEvent.change(component.getByLabelText('Test Input'), {
    target: { value: 'input test entry' }
  })

  fireEvent.click(component.getByRole('button'))

  wait(() =>
    expect(mockHandleSubmit).toBeCalledWith({
      testInput: 'input test entry'
    })
  )
})
