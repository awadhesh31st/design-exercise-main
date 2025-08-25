import { FormBuilderCanvas } from "@/components/canvas";

export default function BuilderPage() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r border-black/5">
        <div className="flex items-center justify-between bg-white text-black p-4 border-b border-black/5 h-16">
          <h2 className="font-semibold">Form Fields</h2>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <FormBuilderCanvas />
      </main>
    </div>
  );
}
