import * as React from 'react'
import styles from './style.css'

export function LoadingSpinner() {
  return (
    <svg className={styles.spinner + ' w-4 h-4'} viewBox='0 0 50 50'>
      <circle
        className='path'
        cx='25'
        cy='25'
        r='20'
        fill='none'
        strokeWidth='5'
      ></circle>
    </svg>
  )
}
