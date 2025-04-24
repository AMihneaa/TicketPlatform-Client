import { useState } from "react"
import { useNavigate } from "react-router-dom"
import RouteSearchForm from "@/component/route-search-form.component"
import RouteResults from "@/component/route-result.component"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"

interface Stop {
  location: string
  arrivalTime: string | null
  departureTime: string | null
}

interface Route {
  stops: Stop[]
  transportId: string
  transportType: "BUS" | "TRAIN" | "AIRPLANE"
  availableSeats: number
  id: string
  status: string
}

export default function RouteSearchPage() {
  const [routes, setRoutes] = useState<Route[][]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchPerformed, setSearchPerformed] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { departure, arrival } = location.state || {}
  
  useEffect(() => {
    if (departure && arrival) {
      handleSearch(departure, arrival)
    }
  }, [departure, arrival])

  const isAuthenticated = !!localStorage.getItem("Authorization")

  const handleSearch = async (departure: string, arrival: string) => {
    if (!isAuthenticated) {
      navigate("/login?redirect=/routes/search")
      return
    }

    setIsLoading(true)
    setError(null)
    setSearchPerformed(true)

    try {
      const response = await fetch(
        `https://47287039-bf8e-4eb6-a406-71bfe9007b4f.eu-central-1.cloud.genez.io/reservation/user/${encodeURIComponent(departure)}/to/${encodeURIComponent(arrival)}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
          },
        }
      )

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error("You are not authorized to view these routes. Please log in again.")
        } else if (response.status === 404) {
          throw new Error("No routes found for the selected locations.")
        } else {
          throw new Error("An error occurred while fetching routes.")
        }
      }

      const data = await response.json()
      setRoutes(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch routes")
      setRoutes([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Find Routes</h1>
          <p className="text-muted-foreground">Search for routes between locations</p>
        </div>

        <RouteSearchForm onSearch={handleSearch} isLoading={isLoading} />

        {isLoading && (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="sr-only">Loading routes...</span>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!isLoading && !error && searchPerformed && routes.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No routes found for the selected locations.</p>
              <p className="text-muted-foreground mt-1">Try different locations or check back later.</p>
            </CardContent>
          </Card>
        )}

        {!isLoading && !error && routes.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Available Routes</h2>
              <p className="text-muted-foreground">Found {routes.length} route options</p>
            </div>
            <RouteResults routeOptions={routes} />
          </div>
        )}
      </div>
    </div>
  )
}
