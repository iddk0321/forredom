export default function MessageTemplate({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col justify-center items-center p-12 rounded  border">
      <p className="text-lg font-semibold">{title}</p>
      {description && <p>{description}</p>}
    </div>
  )
}
