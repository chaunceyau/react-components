import React from 'react'
import ReactDOM from 'react-dom'
import { Transition } from '@headlessui/react'
//
import { Button } from '../button'

interface SlideoverProps {
  children: React.ReactNode
  actions?: Action[]
  onClose: () => any
}

export function Slideover({ children, actions, onClose }: SlideoverProps) {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return ReactDOM.createPortal(
    <div className='fixed inset-0 overflow-hidden'>
      <div className='absolute inset-0 overflow-hidden'>
        <div
          className='absolute inset-0 bg-gray-300 bg-opacity-75 transition-opacity'
          aria-hidden='true'
        ></div>

        <section
          className='absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16'
          aria-labelledby='slide-over-heading'
        >
          <Transition
            show={true}
            enter='transform transition ease-in-out duration-500 sm:duration-700'
            enterFrom='translate-x-full'
            enterTo='translate-x-0'
            leave='transform transition ease-in-out duration-500 sm:duration-700'
            leaveFrom='translate-x-0'
            leaveTo='translate-x-full'
          >
            <div className='w-screen max-w-md h-screen'>
              <form className='h-full flex flex-col bg-white shadow-xl'>
                <div className='flex-1 overflow-y-scroll'>
                  <SlideoverHeader onClose={onClose} />
                  <div className='py-4 px-6'>{children}</div>
                </div>
                {actions?.length ? <SlideoverFooter actions={actions} /> : null}
              </form>
            </div>
          </Transition>
        </section>
      </div>
    </div>,
    document.body
  )
}

interface SlideoverFooterProps {
  actions: Action[]
}

interface Action {
  label: string
  onClick: (...args: any) => void
}

function SlideoverFooter(props: SlideoverFooterProps) {
  return (
    <div className='flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6'>
      <div className='space-x-3 flex justify-end'>
        {props.actions.map((action) => (
          <Button {...action} />
        ))}
      </div>
    </div>
  )
}

interface SlideoverHeaderProps {
  onClose: () => any
}

function SlideoverHeader({ onClose }: SlideoverHeaderProps) {
  return (
    <div className='px-4 py-6 bg-gray-200 sm:px-6'>
      <div className='flex items-start justify-between space-x-3'>
        <div className='space-y-1'>
          <h2
            id='slide-over-heading'
            className='text-lg font-medium text-gray-900'
          >
            New project
          </h2>
          <p className='text-sm text-gray-500'>
            Get started by filling in the information below to create your new
            project.
          </p>
        </div>
        <div className='h-7 flex items-center'>
          <button
            type='button'
            onClick={onClose}
            className='bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          >
            <span className='sr-only'>Close panel</span>
            {/* <!-- Heroicon name: x --> */}
            <svg
              className='h-6 w-6'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
