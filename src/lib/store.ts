import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'
import { createNewField } from './utils'

export const useFormStore = create<FormStore>()(
  devtools(
    persist(
      (set) => ({
        fields: [],
        selectedFieldId: null,
        isDarkMode: typeof window !== 'undefined' ? localStorage.getItem('formkit-theme') === 'dark' : false,
        mode: 'builder',
        draggedIndex: null,
        history: [],
        historyIndex: -1,
        showSuccessToast: false,

        setSelectedFieldId: (id) => set({ selectedFieldId: id }),

        addField: (type) => {
          const newField = createNewField(type)

          set((state) => {
            const newFields = [...state.fields, newField]
            const newHistoryItem: FormHistory = {
              fields: JSON.parse(JSON.stringify(newFields)),
              timestamp: Date.now(),
            }
            const newHistory = state.history
              .slice(0, state.historyIndex + 1)
              .concat(newHistoryItem)
              .slice(-20)
            return {
              fields: newFields,
              selectedFieldId: newField.id,
              history: newHistory,
              historyIndex: Math.min(state.historyIndex + 1, 19),
              showSuccessToast: true,
            }
          })

          setTimeout(() => set({ showSuccessToast: false }), 2000)
        },

        updateField: (id, updates) => {
          set((state) => {
            const newFields = state.fields.map((field) => (field.id === id ? { ...field, ...updates } : field))
            const newHistoryItem: FormHistory = {
              fields: JSON.parse(JSON.stringify(newFields)),
              timestamp: Date.now(),
            }
            const newHistory = state.history
              .slice(0, state.historyIndex + 1)
              .concat(newHistoryItem)
              .slice(-20)
            return {
              fields: newFields,
              history: newHistory,
              historyIndex: Math.min(state.historyIndex + 1, 19),
            }
          })
        },

        removeField: (id) => {
          set((state) => {
            const newFields = state.fields.filter((field) => field.id !== id)
            const newHistoryItem: FormHistory = {
              fields: JSON.parse(JSON.stringify(newFields)),
              timestamp: Date.now(),
            }
            const newHistory = state.history
              .slice(0, state.historyIndex + 1)
              .concat(newHistoryItem)
              .slice(-20)
            return {
              fields: newFields,
              selectedFieldId: state.selectedFieldId === id ? null : state.selectedFieldId,
              history: newHistory,
              historyIndex: Math.min(state.historyIndex + 1, 19),
            }
          })
        },

        moveField: (fromIndex, toIndex) => {
          set((state) => {
            const newFields = [...state.fields]
            const [movedField] = newFields.splice(fromIndex, 1)
            newFields.splice(toIndex, 0, movedField)
            const newHistoryItem: FormHistory = {
              fields: JSON.parse(JSON.stringify(newFields)),
              timestamp: Date.now(),
            }
            const newHistory = state.history
              .slice(0, state.historyIndex + 1)
              .concat(newHistoryItem)
              .slice(-20)
            return {
              fields: newFields,
              history: newHistory,
              historyIndex: Math.min(state.historyIndex + 1, 19),
            }
          })
        },

        duplicateField: (id) => {
          set((state) => {
            const field = state.fields.find((f) => f.id === id)
            if (!field) return state

            const newField = {
              ...createNewField(field.type),
              label: `${field.label} (Copy)`,
            }
            const newFields = [...state.fields, newField]
            const newHistoryItem: FormHistory = {
              fields: JSON.parse(JSON.stringify(newFields)),
              timestamp: Date.now(),
            }
            const newHistory = state.history
              .slice(0, state.historyIndex + 1)
              .concat(newHistoryItem)
              .slice(-20)
            return {
              fields: newFields,
              selectedFieldId: newField.id,
              history: newHistory,
              historyIndex: Math.min(state.historyIndex + 1, 19),
            }
          })
        },

        setIsDarkMode: (isDark) => {
          set({ isDarkMode: isDark })
          if (typeof window !== 'undefined') {
            localStorage.setItem('formkit-theme', isDark ? 'dark' : 'light')
          }
        },

        setMode: (mode) => set({ mode }),

        setDraggedIndex: (index) => set({ draggedIndex: index }),

        undo: () => {
          set((state) => {
            if (state.historyIndex <= 0) return state
            return {
              historyIndex: state.historyIndex - 1,
              fields: state.history[state.historyIndex - 1].fields,
            }
          })
        },

        redo: () => {
          set((state) => {
            if (state.historyIndex >= state.history.length - 1) return state
            return {
              historyIndex: state.historyIndex + 1,
              fields: state.history[state.historyIndex + 1].fields,
            }
          })
        },
      }),
      {
        name: 'form-store',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          fields: state.fields,
          selectedFieldId: state.selectedFieldId,
          isDarkMode: state.isDarkMode,
          mode: state.mode,
          history: state.history,
          historyIndex: state.historyIndex,
        }),
      }
    ),
    { name: 'form-store' }
  )
)
