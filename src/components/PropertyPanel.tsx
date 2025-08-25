import React from 'react'
import { Settings, Plus, Trash2 } from 'lucide-react'
import { useFormStore } from '@/lib/store'
import { componentTypes } from '@/contents'
import { Button } from './ui/button'
import { Input } from './ui/input'

const PropertyPanel = () => {
  const { fields, selectedFieldId, updateField } = useFormStore()
  const selectedField = fields.find((f) => f.id === selectedFieldId)

  if (!selectedField) {
    return (
      <div className="w-80 bg-white  border-l border-gray-200 ">
        <div className="p-6 border-b border-gray-200 ">
          <h3 className="text-lg font-semibold text-gray-900 ">Properties</h3>
          <p className="text-sm text-gray-600  mt-1">No field selected</p>
        </div>
        <div className="p-6 text-center text-gray-500 ">
          <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-sm">Select a field to edit its properties</p>
        </div>
      </div>
    )
  }

  const componentType = componentTypes.find((c) => c.type === selectedField.type)

  return (
    <div className="w-80 bg-white  border-l border-gray-200  overflow-y-auto">
      <div className="p-6 border-b border-gray-200 ">
        <div className="flex items-center gap-3 mb-2">
          {componentType && (
            <div className="p-2 rounded-lg bg-blue-50 ">
              <componentType.icon className="w-4 h-4 text-blue-600 " />
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 ">{componentType?.label}</h3>
            <p className="text-xs text-gray-600 ">Field Properties</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <Input
          value={selectedField.label}
          onChange={(e) => updateField(selectedField.id, { label: e.target.value })}
          placeholder="Enter field label"
        />

        <Input
          value={selectedField.placeholder || ''}
          onChange={(e) => updateField(selectedField.id, { placeholder: e.target.value })}
          placeholder="Enter placeholder text"
        />

        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 ">Field Settings</label>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50  rounded-lg">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="required"
                  checked={selectedField.required || false}
                  onChange={(e) => updateField(selectedField.id, { required: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300  rounded focus:ring-blue-500"
                />
                <label htmlFor="required" className="text-sm font-medium text-gray-700  cursor-pointer">
                  Required field
                </label>
              </div>
              {selectedField.required && <div className="px-2 py-1 bg-red-100 0 text-red-700  text-xs font-medium rounded">Required</div>}
            </div>
          </div>
        </div>

        {(selectedField.type === 'select' || selectedField.type === 'radio') && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 ">Options</label>
            <div className="space-y-2">
              {selectedField.options?.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...(selectedField.options || [])]
                      newOptions[index] = e.target.value
                      updateField(selectedField.id, { options: newOptions })
                    }}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 "
                    onClick={() => {
                      if (selectedField.options && selectedField.options.length > 1) {
                        const newOptions = selectedField.options.filter((_, i) => i !== index)
                        updateField(selectedField.id, { options: newOptions })
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="secondary"
                size="sm"
                className="w-full mt-3"
                onClick={() => {
                  const newOptions = [...(selectedField.options || []), `Option ${(selectedField.options?.length || 0) + 1}`]
                  updateField(selectedField.id, { options: newOptions })
                }}
              >
                <Plus className="w-4 h-4" />
                Add Option
              </Button>
            </div>
          </div>
        )}

        {selectedField.type === 'text' && selectedField.validation && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 ">Validation Rules</label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                value={selectedField.validation.minLength || ''}
                onChange={(e) =>
                  updateField(selectedField.id, {
                    validation: {
                      ...selectedField.validation,
                      minLength: parseInt(e.target.value) || 0,
                    },
                  })
                }
                placeholder="0"
              />
              <Input
                type="number"
                value={selectedField.validation.maxLength || ''}
                onChange={(e) =>
                  updateField(selectedField.id, {
                    validation: {
                      ...selectedField.validation,
                      maxLength: parseInt(e.target.value) || 100,
                    },
                  })
                }
                placeholder="100"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertyPanel
