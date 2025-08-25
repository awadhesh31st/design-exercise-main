'use client'

import { FormBuilderCanvas } from '@/components/canvas'
import ComponentLibrary from '@/components/componentLibrary'
import { Header } from '@/components/header'
import PropertyPanel from '@/components/propertyPanel'
import { useFormStore } from '@/lib/store'

const BuilderPage = () => {
  const { mode } = useFormStore()

  console.log('mode', mode)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex h-[calc(100vh-89px)]">
        {mode === 'builder' && <ComponentLibrary />}
        <FormBuilderCanvas />
        {mode === 'builder' && <PropertyPanel />}
      </div>
    </div>
  )
}

export default BuilderPage
