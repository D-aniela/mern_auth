import { ReactNode } from 'react'

export default function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <div className='error-message'>
      <p className='bg-red-50 text-red-600 p-3 uppercase text-sm font-bold text-center'>
        {children}
      </p>
    </div>
  )
}
