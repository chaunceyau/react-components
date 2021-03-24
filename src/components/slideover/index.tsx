import React from 'react'
import ReactDOM from 'react-dom'
import { Transition } from '@headlessui/react'
//
// import { Action } from './interfaces'
import { SlideoverHeader } from './header'
import { useClickOutside } from '../../hooks/useClickOutside'

interface SlideoverProps {
  // actions?: Action[]
  // onClose: () => any
  trigger: React.ReactNode
}

function useSlideoverState() {
  const state = React.useState<SlideoverState>('CLOSED')

  React.useEffect(() => {
    if (state[0] !== 'CLOSING') {
      return
    }

    const timeout = setTimeout(() => {
      state[1]('CLOSED')
    }, 500)
    return () => clearTimeout(timeout)
  }, [state])

  return state
}

type SlideoverState = 'OPEN' | 'CLOSED' | 'CLOSING'

export function Slideover({
  children,
  trigger
}: React.PropsWithChildren<SlideoverProps>) {
  const [state, setState] = useSlideoverState()

  const onClose = React.useCallback(() => setState('CLOSING'), [])

  return (
    <div>
      {React.cloneElement(trigger as any, {
        onClick: () => setState('OPEN')
      })}
      {/* COULD BE IMPROVED - 2nd time opening doesn't transition */}
      {state !== 'CLOSED' ? (
        <Portal open={state === 'OPEN'} onClose={onClose}>
          {children}
        </Portal>
      ) : null}
      {/* )} */}
    </div>
  )
}

function usePortal() {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])
}

function Portal(
  props: React.PropsWithChildren<{ onClose: () => void; open: boolean }>
) {
  usePortal()

  const slideoverRef = React.useRef<any>()

  useClickOutside(slideoverRef, props.onClose)

  return ReactDOM.createPortal(
    <div className='fixed inset-0 overflow-hidden'>
      <div className='absolute inset-0 overflow-hidden'>
        <div
          className='absolute inset-0 bg-gray-300 bg-opacity-75 transition-opacity'
          aria-hidden='true'
        />

        <section
          className='absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16'
          aria-labelledby='slide-over-heading'
        >
          <Transition
            show={props.open}
            enter='transform transition ease-in-out duration-500 sm:duration-700'
            enterFrom='translate-x-full'
            enterTo='translate-x-0'
            leave='transform transition ease-in-out duration-500 sm:duration-700'
            leaveFrom='translate-x-0'
            leaveTo='translate-x-full'
          >
            <div
              className='w-screen max-w-md h-screen bg-white z-50'
              ref={slideoverRef}
            >
              <div className='h-full flex flex-col bg-white shadow-xl'>
                <SlideoverHeader onClose={props.onClose} />
                <div className='flex-1 overflow-y-scroll'>
                  <div className='px-6 pb-6'>{props.children}</div>
                </div>
              </div>
            </div>
          </Transition>
        </section>
      </div>
    </div>,
    document.body
  )
}
