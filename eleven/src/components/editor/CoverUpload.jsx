import { useRef } from 'react'
import { ImagePlus, X } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function CoverUpload({ value, onChange }) {
  const inputRef = useRef(null)

  function onPick() {
    inputRef.current?.click()
  }

  function onFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      onChange({ name: file.name, dataUrl: String(reader.result) })
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  if (value?.dataUrl) {
    return (
      <div className="group relative overflow-hidden rounded-xl border border-border">
        <img src={value.dataUrl} alt="" className="aspect-[16/7] w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="truncate text-[12px] text-white/90">{value.name}</span>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="xs" onClick={onPick}>Replace</Button>
            <Button variant="ghost" size="xs" className="text-white hover:bg-white/10 hover:text-white" onClick={() => onChange(null)}>
              <X /> Remove
            </Button>
          </div>
        </div>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={onPick}
      className="group flex aspect-[16/7] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface/40 transition-colors hover:border-foreground/20 hover:bg-muted/50"
    >
      <span className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:text-foreground">
        <ImagePlus className="size-5" />
      </span>
      <span className="text-[13px] font-medium">Add a cover image</span>
      <span className="text-[12px] text-muted-foreground">PNG, JPG or SVG · up to 5MB</span>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
    </button>
  )
}
