import { useFormStore } from '@/lib/store'
import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import PreviewFormField from './previewFormField'
import DraggableFormField from './draggableFormField'

const FormBuilderCanvas = () => {
  const { mode, fields, selectedFieldId, draggedIndex, setDraggedIndex, moveField } = useFormStore()

  const handleDrop = (toIndex: number) => {
    if (draggedIndex !== null && draggedIndex !== toIndex) {
      moveField(draggedIndex, toIndex)
    }
    setDraggedIndex(null)
  }

  if (fields.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50  m-4 rounded-xl border-2 border-dashed border-gray-300 ">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100   flex items-center justify-center shadow-inner">
            <Plus className="w-12 h-12 text-blue-600 " />
          </div>
          <h3 className="text-2xl font-bold text-gray-900  mb-3">Start Building Your Form</h3>
          <p className="text-gray-600  leading-relaxed mb-6">
            Choose from our component library to create beautiful, functional forms. Click any component to add it to your form.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 ">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Click to add</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Drag to reorder</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Click to configure</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-6 bg-gray-50  overflow-y-auto">
      <Card className="max-w-4xl mx-auto p-8 border-gray-200 bg-gradient-to-br from-white to-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900  mb-2">{mode === 'preview' ? 'Form Preview' : 'Form Builder'}</h2>
              <p className="text-gray-600  text-lg">
                {mode === 'preview' ? 'This is how your form will appear to users' : 'Design your form by configuring each field'}
              </p>
            </div>
            {mode === 'builder' && fields.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-500 ">
                <span>
                  {fields.length} field{fields.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>

        <div className="space-y-6">
          {mode === 'builder'
            ? fields.map((field, index) => (
                <DraggableFormField
                  key={field.id}
                  field={field}
                  index={index}
                  isSelected={selectedFieldId === field.id}
                  isDragging={draggedIndex === index}
                  onDrop={handleDrop}
                />
              ))
            : fields.map((field) => <PreviewFormField key={field.id} field={field} />)}
        </div>

        {mode === 'preview' && fields.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200 ">
            <Button variant="default" size="lg" className="w-full">
              Submit Form
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}

export { FormBuilderCanvas }
