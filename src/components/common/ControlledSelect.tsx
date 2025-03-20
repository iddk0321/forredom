import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type SelectItems = {
  key: string
  value: string
  label: string
}[]

export type ControlledSelectProps = {
  items: SelectItems
  name?: string
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

export function ControlledSelect({
  items,
  name,
  value,
  onChange,
  placeholder = '',
}: ControlledSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="min-w-[140px]" name={name}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.key} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
