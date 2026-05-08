import * as DM from '@radix-ui/react-dropdown-menu'
import { Check, ChevronRight, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

export const DropdownMenu = DM.Root
export const DropdownMenuTrigger = DM.Trigger
export const DropdownMenuGroup = DM.Group
export const DropdownMenuPortal = DM.Portal
export const DropdownMenuSub = DM.Sub
export const DropdownMenuRadioGroup = DM.RadioGroup

export function DropdownMenuContent({ className, sideOffset = 6, align = 'end', ...props }) {
  return (
    <DM.Portal>
      <DM.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50 min-w-[10rem] overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-pop dark:shadow-pop-dark',
          'data-[state=open]:animate-fade-in data-[side=bottom]:translate-y-0',
          className,
        )}
        {...props}
      />
    </DM.Portal>
  )
}

export function DropdownMenuItem({ className, inset, ...props }) {
  return (
    <DM.Item
      className={cn(
        'relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-[13px] outline-none transition-colors',
        'focus:bg-muted focus:text-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        '[&>svg]:size-4 [&>svg]:text-muted-foreground',
        inset && 'pl-8',
        className,
      )}
      {...props}
    />
  )
}

export function DropdownMenuLabel({ className, inset, ...props }) {
  return (
    <DM.Label
      className={cn(
        'px-2 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground',
        inset && 'pl-8',
        className,
      )}
      {...props}
    />
  )
}

export function DropdownMenuSeparator({ className, ...props }) {
  return (
    <DM.Separator
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  )
}

export function DropdownMenuShortcut({ className, ...props }) {
  return (
    <span
      className={cn('ml-auto text-[11px] tracking-wider text-muted-foreground', className)}
      {...props}
    />
  )
}

export function DropdownMenuCheckboxItem({ className, children, checked, ...props }) {
  return (
    <DM.CheckboxItem
      checked={checked}
      className={cn(
        'relative flex cursor-pointer select-none items-center rounded-md py-1.5 pl-8 pr-2 text-[13px] outline-none transition-colors',
        'focus:bg-muted focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <DM.ItemIndicator>
          <Check className="size-3.5" />
        </DM.ItemIndicator>
      </span>
      {children}
    </DM.CheckboxItem>
  )
}

export function DropdownMenuRadioItem({ className, children, ...props }) {
  return (
    <DM.RadioItem
      className={cn(
        'relative flex cursor-pointer select-none items-center rounded-md py-1.5 pl-8 pr-2 text-[13px] outline-none transition-colors',
        'focus:bg-muted focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <DM.ItemIndicator>
          <Circle className="size-2 fill-current" />
        </DM.ItemIndicator>
      </span>
      {children}
    </DM.RadioItem>
  )
}

export function DropdownMenuSubTrigger({ className, children, inset, ...props }) {
  return (
    <DM.SubTrigger
      className={cn(
        'flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-[13px] outline-none focus:bg-muted data-[state=open]:bg-muted',
        inset && 'pl-8',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto size-3.5" />
    </DM.SubTrigger>
  )
}

export function DropdownMenuSubContent({ className, ...props }) {
  return (
    <DM.SubContent
      className={cn(
        'z-50 min-w-[10rem] overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-pop dark:shadow-pop-dark',
        className,
      )}
      {...props}
    />
  )
}
