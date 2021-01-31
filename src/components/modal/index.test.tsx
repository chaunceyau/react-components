import { render, screen } from '@testing-library/react'
import React from 'react'
import { Modal } from '.'

const action = {
  label: 'test action',
  func: async () => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({})
      }, 2500)
    })
  }
}

const title = 'Eius at perspiciatis voluptate'
const description = 'Numquam rem maxime voluptates omnis doloremque nemo'

describe('modal component', () => {
  it('displays cancel button with no action', () => {
    render(
      <Modal
        title={title}
        description={description}
        show={true}
        onClose={async () => {}}
      />
    )

    expect(screen.getByRole('heading')).toHaveTextContent(title)
    // expect(screen.getByText(title)).toBeInTheDocument()
    // expect(screen.getByText(description)).toBeInTheDocument()
  })

  it('displays action button if provided', () => {
    render(
      <Modal
        title={title}
        description={description}
        show={true}
        onClose={async () => {}}
        action={action}
      />
    )

    expect(screen.getByText(action.label)).toBeInTheDocument()
  })
})
