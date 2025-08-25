import { FC } from 'react'
import { Input } from './ui/input'

const PreviewFormField: FC<PreviewFormFieldProps> = ({ field }) => {
  const renderField = () => {
    const baseProps = {
      placeholder: field.placeholder,
      required: field.required,
      className: 'w-full',
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
            className="w-full px-3 py-2.5 border border-gray-300  rounded-lg bg-white  text-gray-900  placeholder-gray-500  focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-vertical"
          />
        )
      case 'select':
        return (
          <select className="w-full px-3 py-2.5 border border-gray-300  rounded-lg bg-white  text-gray-900  focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors">
            <option value="">Select an option</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )
      case 'checkbox':
        return (
          <div className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300  rounded focus:ring-blue-500 focus:ring-2" />
            <label className="text-sm text-gray-700 ">{field.placeholder || 'Checkbox option'}</label>
          </div>
        )
      case 'radio':
        return (
          <div className="space-y-3">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  className="w-4 h-4 text-blue-600 border-gray-300  focus:ring-blue-500 focus:ring-2"
                />
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
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-900 ">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderField()}
    </div>
  )
}

export default PreviewFormField
