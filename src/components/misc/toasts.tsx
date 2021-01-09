import React from 'react'
import ReactDOM from 'react-dom'
import * as ReactHotToast from 'react-hot-toast'

export const Toasts = () => {
  const { toasts, handlers } = ReactHotToast.useToaster({ duration: 3000 })
  const { startPause, endPause } = handlers

  return ReactDOM.createPortal(
    <div
      className='fixed top-0 right-0 w-84 h-screen flex flex-col pt-6 space-y-6 px-4'
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      {toasts.map((toast) => {
        const wrapperClasses = [
          'w-full shadow-lg px-4 rounded-lg flex items-center py-4 transition-all ease-out duration-500'
        ]

        if (toast.type === 'success') {
          // wrapperClasses.push("bg-green-600");
          wrapperClasses.push(
            'text-white border-green-600 bg-green-500 text-white'
          )
        } else if (toast.type === 'error') {
          wrapperClasses.push('bg-red-600')
        } else if (toast.type === 'loading') {
          wrapperClasses.push('bg-gray-300 text-gray-500')
        }

        wrapperClasses.push(toast.visible ? 'opacity-100' : 'opacity-0')

        return (
          <button
            key={toast.id}
            role='alert'
            className={wrapperClasses.join(' ')}
            onClick={() => ReactHotToast.toast.dismiss(toast.id)}
          >
            {toast.type === 'success' ? (
              <svg
                className='checkmark w-4 h-4 mr-2'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 52 52'
              >
                <circle
                  className='checkmark__circle stroke-current'
                  cx='26'
                  cy='26'
                  r='25'
                  fill='none'
                />
                <path
                  className='checkmark__check'
                  fill='none'
                  d='M14.1 27.2l7.1 7.2 16.7-16.8'
                />
              </svg>
            ) : null}
            <p className='-mt-px mb-px ml-px'>{toast.message}</p>
          </button>
        )
      })}
    </div>,
    document.body
  )
}
