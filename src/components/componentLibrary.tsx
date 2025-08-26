import React from 'react'
import { Plus } from 'lucide-react'
import { useFormStore } from '@/lib/store'
import { categories, componentTypes } from '@/contents'
import { Card } from './ui/card'

const ComponentLibrary = () => {
  const { addField } = useFormStore()

  return (
    <div className="w-80 bg-white  border-r border-gray-200  overflow-y-auto">
      <div className="p-6 border-b border-gray-200 ">
        <div className="flex items-center gap-3 mb-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 ">Components</h2>
          </div>
        </div>
        <p className="text-sm text-gray-600 ">Drag or click to add components to your form</p>
      </div>

      <div className="p-4 space-y-6">
        {Object.entries(categories).map(([categoryKey, category]) => {
          const categoryComponents = componentTypes.filter((c) => c.category === categoryKey)
          const CategoryIcon = category.icon

          return (
            <div key={categoryKey}>
              <div className="flex items-center gap-2 mb-3 px-2">
                <CategoryIcon className="w-4 h-4 text-gray-500" />
                <h3 className="text-sm font-medium text-gray-700  uppercase tracking-wider">{category.label}</h3>
              </div>

              <div className="grid gap-2">
                {categoryComponents.map((component) => {
                  const Icon = component.icon
                  return (
                    <Card key={component.id} className="p-4 group cursor-pointer border-gray-200 hover:border-gray-300" onClick={() => addField(component.type)}>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-blue-50  group-hover:bg-blue-100  transition-colors">
                          <Icon className="w-4 h-4 text-blue-600 " />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900  text-sm group-hover:text-blue-600 transition-colors">{component.label}</h4>
                          <p className="text-xs text-gray-600  mt-1 leading-relaxed">{component.description}</p>
                        </div>
                        <Plus className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100" />
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ComponentLibrary
