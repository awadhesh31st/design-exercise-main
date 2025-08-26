import { Copy, X, GripVertical } from 'lucide-react'
import { FC, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useFormStore } from '@/lib/store'

const DraggableFormField: FC<DraggableFormFieldProps> = (props) => {
  const { field, index, isSelected, isDragging, onDrop } = props
  const { setSelectedFieldId, removeField, duplicateField, setDraggedIndex } = useFormStore()

  const [isHovered, setIsHovered] = useState(false)

  const handleDragStart = (e: React.DragEvent<HTMLElement>) => {
    e.dataTransfer.effectAllowed = 'move'
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    onDrop(index)
  }

  const renderField = () => {
    const baseProps = {
      placeholder: field.placeholder,
      required: field.required,
      className: '',
      disabled: true,
    }

    switch (field.type) {
      case 'text':
        return <Input {...baseProps} type="text" />
      case 'email':
        return <Input {...baseProps} type="email" />
      case 'number':
        return <Input {...baseProps} type="number" />
      case 'textarea':
        return (
          <textarea
            {...baseProps}
            rows={3}
            className="w-full px-3 py-2.5 border border-gray-300  rounded-lg bg-white text-gray-900  placeholder-gray-500  focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-vertical"
          />
        )
      case 'select':
        return (
          <select
            disabled
            className="w-full px-3 py-2.5 border border-gray-300  rounded-lg bg-white  text-gray-900  focus:outline-none transition-colors"
          >
            <option value="">Select an option</option>
            {field.options?.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        )
      case 'checkbox':
        return (
          <div className="flex items-center gap-3">
            <input type="checkbox" disabled className="w-4 h-4 text-blue-600 border-gray-300  rounded focus:ring-blue-500" />
            <label className="text-sm text-gray-700 ">{field.placeholder || 'Checkbox option'}</label>
          </div>
        )
      case 'radio':
        return (
          <div className="space-y-3">
            {field.options?.map((option, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input type="radio" name={field.id} value={option} disabled className="w-4 h-4 text-blue-600 border-gray-300  focus:ring-blue-500" />
                <label className="text-sm text-gray-700 ">{option}</label>
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div
      className={`transition-all duration-200 ${isDragging ? 'opacity-50 scale-105 rotate-1' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={() => setDraggedIndex(null)}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative p-5 rounded-xl border-2 transition-all duration-200 group cursor-pointer ${
          isSelected ? 'border-blue-500 bg-blue-50/50  shadow-lg ring-1 ring-blue-500/20' : 'border-gray-200  hover:border-blue-300  hover:shadow-md'
        }`}
        onClick={(e) => {
          e.stopPropagation()
          setSelectedFieldId(field.id)
        }}
      >
        <div
          className={`absolute -top-2 -right-2 flex gap-1 transition-all duration-200 ${
            isHovered || isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
          }`}
        >
          <Button
            variant="secondary"
            size="sm"
            className="w-7 h-7 p-0 rounded-lg shadow-lg bg-white  border-2 border-white "
            onClick={(e) => {
              e.stopPropagation()
              duplicateField(field.id)
            }}
            title="Duplicate field"
          >
            <Copy className="w-3 h-3" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="w-7 h-7 p-0 shadow-lg bg-red-600 rounded-lg"
            onClick={(e) => {
              e.stopPropagation()
              removeField(field.id)
            }}
            title="Delete field"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>

        {/* Drag handle */}
        <div
          className={`absolute -top-2 -left-2 transition-all duration-200 ${
            isHovered || isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
          }`}
        >
          <div className="w-7 h-7 bg-gray-500 hover:bg-gray-600 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg border-2 border-white ">
            <GripVertical className="w-3 h-3 text-white" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between mt-2">
            <label className="text-sm font-medium text-gray-900  flex items-center gap-2">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {isSelected && <div className="px-2 py-1 bg-blue-100  text-blue-700  text-xs font-medium rounded-md">Selected</div>}
          </div>
          {renderField()}
        </div>
      </div>
    </div>
  )
}

export default DraggableFormField
