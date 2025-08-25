import { componentTypes } from '@/contents'
import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args))
}

export const createNewField = (type: FormField['type']): FormField => {
  const id = `field-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  const componentType = componentTypes.find((c: ComponentType) => c.type === type)

  return {
    id,
    type,
    label: componentType?.label || `New ${type} field`,
    placeholder:
      type === 'textarea'
        ? 'Enter your message here...'
        : type === 'email'
          ? 'example@email.com'
          : type === 'number'
            ? 'Enter a number'
            : type === 'select'
              ? 'Choose an option'
              : type === 'checkbox'
                ? 'Check this option'
                : `Enter ${type}...`,
    required: false,
    options: type === 'select' || type === 'radio' ? ['Option 1', 'Option 2', 'Option 3'] : undefined,
    validation: type === 'text' ? { minLength: 0, maxLength: 100 } : undefined,
  }
}
