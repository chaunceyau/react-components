import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Form } from '..'
import { FormInput } from '../elements/input'
import { act } from 'react-dom/test-utils'

const mockOnSubmit = jest.fn(() => Promise.resolve({ fieldName: 'test-value' }))

describe('App', () => {
  beforeEach(() => {
    render(
      <Form onSubmit={mockOnSubmit}>
        <FormInput
          name='fieldName'
          label='example label'
          registerOptions={{ required: 'this value is required' }}
        />
      </Form>
    )
  })

  it('should display required error when value is not provided', async () => {
    await act(async () => {
      fireEvent.submit(screen.getByText(/save/i))

      await waitFor(() =>
        expect(screen.getByText(/this value is required/i)).toBeInTheDocument()
      )

      expect(mockOnSubmit).not.toHaveBeenCalled()
    })
  })

  it('should be called with the correct value', async () => {
    await act(async () => {
      fireEvent.input(screen.getByLabelText(/example label/i), {
        target: {
          value: 'test-value'
        }
      })

      // test-value
      fireEvent.submit(screen.getByText(/save/i))

      await waitFor(() =>
        expect(mockOnSubmit).toHaveBeenCalledWith({ fieldName: 'test-value' })
      )
    })
  })
})
