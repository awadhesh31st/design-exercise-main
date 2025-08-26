import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'w-full px-3 py-2.5 border border-gray-300  rounded-lg bg-white text-gray-900  placeholder-gray-500  focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-vertical',
        className
      )}
      {...props}
    />
  )
}

export { Input }
