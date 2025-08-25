import React, { FC } from 'react'
import { Settings, Eye, Undo, Redo } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useFormStore } from '@/lib/store'

const Header: FC<HeaderProps> = ({ canUndo, canRedo }) => {
  const { fields, mode, setMode, undo, redo } = useFormStore()
  const fieldsCount = fields.length

  return (
    <header className="bg-white border-b border-gray-200  px-6 py-4 sticky top-0 z-40 backdrop-blur-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600  bg-clip-text text-transparent">FormKit</h1>
              <p className="text-sm text-gray-500 ">
                {fieldsCount} {fieldsCount === 1 ? 'field' : 'fields'}
              </p>
            </div>
          </div>

          {mode === 'builder' && (
            <div className="flex items-center gap-1 pl-6 border-l border-gray-200 ">
              <Button variant="ghost" size="sm" onClick={undo} disabled={!canUndo} title="Undo (Ctrl+Z)" className="cursor-pointer">
                <Undo className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={redo} disabled={!canRedo} title="Redo (Ctrl+Y)" className="cursor-pointer">
                <Redo className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant={mode === 'builder' ? 'default' : 'ghost'} size="sm" onClick={() => setMode('builder')} className="cursor-pointer">
            <Settings className="w-4 h-4" />
            Builder
          </Button>
          <Button variant={mode === 'preview' ? 'default' : 'ghost'} size="sm" onClick={() => setMode('preview')} className="cursor-pointer">
            <Eye className="w-4 h-4" />
            Preview
          </Button>
        </div>
      </div>
    </header>
  )
}

export { Header }
