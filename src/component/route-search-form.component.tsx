import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface RouteSearchFormProps {
  onSearch: (departure: string, arrival: string) => void
  isLoading: boolean
}

export default function RouteSearchForm({ onSearch, isLoading }: RouteSearchFormProps) {
  const [departure, setDeparture] = useState("")
  const [arrival, setArrival] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (departure.trim() && arrival.trim()) {
      onSearch(departure.trim(), arrival.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">From</label>
        <Input
          type="text"
          placeholder="Departure location"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">To</label>
        <Input
          type="text"
          placeholder="Arrival location"
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
        />
      </div>
      <div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>
    </form>
  )
}
