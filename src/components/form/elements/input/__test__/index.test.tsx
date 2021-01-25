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

// test('form input shows error if no value', async () => {
//   const component = render(
//     <Form
//       id='form1'
//       onSubmit={mockHandleSubmit}
//       // onSubmit={() => mockHandleSubmit()}
//       defaultValues={{ testInput: '' }}
//     >
//       <FormInput
//         name='testInput'
//         label='Test Input'
//         registerOptions={{ required: true }}
//       />
//       <FormButton label='test submit' />
//     </Form>
//   )

//   act(() => {
//     fireEvent.change(component.getByLabelText('Test Input'), {
//             target: { value: 'input test entry' }
//           })
//     fireEvent.click(component.getByRole('button'))
//   })
//   expect(mockHandleSubmit).not.toBeCalled()
// })

test('form input correctly submits', async () => {
  const component = render(
    <Form
      id='form1'
      onSubmit={mockHandleSubmit}
      // onSubmit={() => mockHandleSubmit()}
      defaultValues={{ testInput: '' }}
    >
      <FormInput
        name='testInput'
        label='Test Input'
        registerOptions={{ required: true }}
      />
      <FormButton label='test submit' />
    </Form>
  )

  await act(async () => {
    // fireEvent.change(component.getByLabelText('Test Input'), {
    //   target: { value: 'input test entry' }
    // })

    fireEvent.click(component.getByRole('button'))
    await wait(
      async () =>
        await expect(
          component.getByText(/must provide a value/i)
        ).toBeInTheDocument()
      // await expect(mockHandleSubmit).toBeCalledWith({
      //   testInput: 'input test entry'
      // })
    )
  })
})
