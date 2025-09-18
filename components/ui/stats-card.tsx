import { Card } from "@/components/ui/card"

interface StatsCardProps {
  rating: number
  totalClients: number
  metrics: {
    label: string
    value: number
  }[]
}

export function StatsCard({ rating, totalClients, metrics }: StatsCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-[#282829] text-white flex items-center justify-center">
            <span className="text-2xl font-bold">{rating}%</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Satisfied out of {totalClients}</p>
            <p className="text-sm text-gray-500">Clients</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{metric.label}</span>
              <span className="font-medium">{metric.value}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#282829] rounded-full" style={{ width: `${metric.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

