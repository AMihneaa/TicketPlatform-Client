import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function QuickSearchSection() {
  const [departure, setDeparture] = useState("")
  const [arrival, setArrival] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!departure || !arrival) {
      alert("Please select both departure and arrival locations.")
      return
    }

    navigate("/routes/search", {
      state: { departure, arrival }
    })
  }

  return (
    <section className="container px-4 md:px-6">
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Quick Search</CardTitle>
            <CardDescription>Find your route and book tickets instantly</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 sm:grid-cols-2 md:grid-cols-3" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="from" className="text-sm font-medium">From</label>
                <select
                  id="from"
                  className="form-select"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                >
                  <option value="">Select departure</option>
                  <option value="bucuresti">Bucuresti</option>
                  <option value="cluj">Cluj</option>
                  <option value="iasi">Iasi</option>
                  <option value="timisoara">Timisoara</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="to" className="text-sm font-medium">To</label>
                <select
                  id="to"
                  className="form-select"
                  value={arrival}
                  onChange={(e) => setArrival(e.target.value)}
                >
                  <option value="">Select destination</option>
                  <option value="constanta">Constanta</option>
                  <option value="brasov">Brasov</option>
                  <option value="sibiu">Sibiu</option>
                  <option value="pitesti">Pitesti</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button type="submit" className="w-full">Search</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
