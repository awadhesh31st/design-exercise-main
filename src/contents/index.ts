import { Type, Hash, Mail, MessageSquare, ChevronDown, CheckSquare, Circle } from 'lucide-react'

export const categories: Record<string, Category> = {
  input: { label: 'Input Fields', icon: Type },
  selection: { label: 'Selection Fields', icon: CheckSquare },
}

export const componentTypes: ComponentType[] = [
  {
    id: 'text',
    type: 'text',
    label: 'Text Input',
    icon: Type,
    description: 'Single line text input',
    category: 'input',
  },
  {
    id: 'email',
    type: 'email',
    label: 'Email Address',
    icon: Mail,
    description: 'Email validation included',
    category: 'input',
  },
  {
    id: 'number',
    type: 'number',
    label: 'Number Input',
    icon: Hash,
    description: 'Numeric input with validation',
    category: 'input',
  },
  {
    id: 'textarea',
    type: 'textarea',
    label: 'Text Area',
    icon: MessageSquare,
    description: 'Multi-line text input',
    category: 'input',
  },
  {
    id: 'select',
    type: 'select',
    label: 'Select Dropdown',
    icon: ChevronDown,
    description: 'Choose from predefined options',
    category: 'selection',
  },
  {
    id: 'checkbox',
    type: 'checkbox',
    label: 'Checkbox',
    icon: CheckSquare,
    description: 'Single boolean choice',
    category: 'selection',
  },
  {
    id: 'radio',
    type: 'radio',
    label: 'Radio Group',
    icon: Circle,
    description: 'Single choice from multiple options',
    category: 'selection',
  },
]
