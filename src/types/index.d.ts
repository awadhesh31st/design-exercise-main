type FieldType = 'text' | 'email' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio'
type FieldCategory = 'input' | 'selection' | 'advanced'
type ModeType = 'builder' | 'preview'

type Validation = {
  minLength?: number
  maxLength?: number
  pattern?: string
}

type FormField = {
  id: string
  type: FieldType
  label: string
  placeholder?: string
  required?: boolean
  options?: string[]
  validation?: Validation
}

type ComponentType = {
  id: string
  type: FormField['type']
  label: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  category: FieldCategory
}

type Category = {
  label: string
  icon: React.ComponentType<{ className?: string }>
}

type FormHistory = {
  fields: FormField[]
  timestamp: number
}

type FormStore = {
  fields: FormField[]
  selectedFieldId: string | null
  isDarkMode: boolean
  mode: 'builder' | 'preview'
  draggedIndex: number | null
  history: FormHistory[]
  historyIndex: number
  showSuccessToast: boolean
  setSelectedFieldId: (id: string | null) => void
  addField: (type: FormField['type']) => void
  updateField: (id: string, updates: Partial<FormField>) => void
  removeField: (id: string) => void
  moveField: (fromIndex: number, toIndex: number) => void
  duplicateField: (id: string) => void
  setIsDarkMode: (isDark: boolean) => void
  setMode: (mode: 'builder' | 'preview') => void
  setDraggedIndex: (index: number | null) => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
}

type PreviewFormFieldProps = {
  field: FormField
}

type DraggableFormFieldProps = {
  field: FormField
  index: number
  isSelected: boolean
  isDragging: boolean
  onDrop: (index: number) => void
}
