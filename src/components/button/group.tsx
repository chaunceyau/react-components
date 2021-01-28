import React from 'react'
import { Button } from './index'

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
