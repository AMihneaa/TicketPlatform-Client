"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Clock, Bus, Train, Plane, Info, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { format, formatDistanceStrict, parseISO } from "date-fns"

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

interface RouteResultsProps {
  routeOptions: Route[][]
}

export default function RouteResults({ routeOptions }: RouteResultsProps) {
  const [selectedTab, setSelectedTab] = useState("all")

  const filterByTransportType = (type: string) => {
    if (type === "all") return routeOptions
    return routeOptions.filter((routeList) => routeList.some((route) => route.transportType === type))
  }

  const filteredOptions = filterByTransportType(selectedTab)

  const getTransportIcon = (type: string) => {
    switch (type) {
      case "BUS":
        return <Bus className="h-4 w-4" />
      case "TRAIN":
        return <Train className="h-4 w-4" />
      case "AIRPLANE":
        return <Plane className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getTransportColorClass = (type: string) => {
    switch (type) {
      case "BUS":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "TRAIN":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "AIRPLANE":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const formatDateTime = (dateTimeString: string | null) => {
    if (!dateTimeString) return { time: "N/A", date: "N/A" }
    try {
      const date = parseISO(dateTimeString)
      return {
        time: format(date, "HH:mm"),
        date: format(date, "MMM d, yyyy"),
      }
    } catch (error) {
      return { time: "Invalid date", date: "Invalid date" }
    }
  }

  const calculateDuration = (startTime: string | null, endTime: string | null) => {
    if (!startTime || !endTime) return "Unknown"
    try {
      const start = parseISO(startTime)
      const end = parseISO(endTime)
      return formatDistanceStrict(end, start)
    } catch (error) {
      return "Invalid duration"
    }
  }

  const reserveTicket = async (transportIds: string[]) => {
    console.log("Reserving ticket for:", transportIds)
  
    const token = localStorage.getItem("Authorization")
  
    if (!token) {
      alert("You must be logged in to reserve tickets.")
      return
    }
  
    for (const routeID of transportIds) {
      try {
        const response = await fetch(
          `https://47287039-bf8e-4eb6-a406-71bfe9007b4f.eu-central-1.cloud.genez.io/reservation/user/route/${routeID}/ROUTE`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
  
        if (!response.ok) {
          const errorText = await response.text()
          console.error(`Failed to reserve for route ${routeID}:`, errorText)
          alert(`Error reserving route ${routeID}: ${errorText}`)
        } else {
          console.log(`Successfully reserved ticket for route ${routeID}`)
        }
      } catch (error) {
        console.error("Network error:", error)
        alert("Network error while reserving ticket.")
      }
    }
  
    alert("Reservation process completed!")
    window.location.replace("/my-tickets")
  }
  
  

  const getRouteEndpoints = (route: Route) => {
    if (!route.stops || route.stops.length === 0) {
      return { departure: "Unknown", arrival: "Unknown" }
    }
    return {
      departure: route.stops[0].location,
      arrival: route.stops[route.stops.length - 1].location,
    }
  }

  const getRouteTimes = (route: Route) => {
    if (!route.stops || route.stops.length === 0) {
      return { departureTime: null, arrivalTime: null }
    }

    const firstStop = route.stops[0]
    const lastStop = route.stops[route.stops.length - 1]

    return {
      departureTime: firstStop.departureTime,
      arrivalTime: lastStop.arrivalTime,
    }
  }

  const calculateOptionDetails = (routeOption: Route[]) => {
    if (routeOption.length === 0) {
      return {
        departureLocation: "Unknown",
        arrivalLocation: "Unknown",
        departureTime: null,
        arrivalTime: null,
        duration: "Unknown",
      }
    }

    const firstRoute = routeOption[0]
    const lastRoute = routeOption[routeOption.length - 1]

    const firstRouteEndpoints = getRouteEndpoints(firstRoute)
    const lastRouteEndpoints = getRouteEndpoints(lastRoute)

    const firstRouteTimes = getRouteTimes(firstRoute)
    const lastRouteTimes = getRouteTimes(lastRoute)

    return {
      departureLocation: firstRouteEndpoints.departure,
      arrivalLocation: lastRouteEndpoints.arrival,
      departureTime: firstRouteTimes.departureTime,
      arrivalTime: lastRouteTimes.arrivalTime,
      duration: calculateDuration(firstRouteTimes.departureTime, lastRouteTimes.arrivalTime),
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="BUS" className="gap-2">
            <Bus className="h-4 w-4" /> Bus
          </TabsTrigger>
          <TabsTrigger value="TRAIN" className="gap-2">
            <Train className="h-4 w-4" /> Train
          </TabsTrigger>
          <TabsTrigger value="AIRPLANE" className="gap-2">
            <Plane className="h-4 w-4" /> Airplane
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          {filteredOptions.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No routes found for the selected transport type.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredOptions.map((routeOption, optionIndex) => {
                const optionDetails = calculateOptionDetails(routeOption)
                const departureDateTime = formatDateTime(optionDetails.departureTime)
                const arrivalDateTime = formatDateTime(optionDetails.arrivalTime)

                return (
                  <Card key={optionIndex} className="overflow-hidden">
                    <CardHeader className="pb-0">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <CardTitle className="text-lg">Option {optionIndex + 1}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {routeOption.length > 1 ? `${routeOption.length} segments` : "Direct"}
                          </Badge>
                          {routeOption.map((route, i) => (
                            <Badge key={i} className={cn("text-xs", getTransportColorClass(route.transportType))}>
                              {route.transportType}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid gap-4 md:grid-cols-4">
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">From</div>
                          <div className="font-medium capitalize">{optionDetails.departureLocation}</div>
                          <div className="text-lg font-semibold">{departureDateTime.time}</div>
                          <div className="text-sm text-muted-foreground">{departureDateTime.date}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">To</div>
                          <div className="font-medium capitalize">{optionDetails.arrivalLocation}</div>
                          <div className="text-lg font-semibold">{arrivalDateTime.time}</div>
                          <div className="text-sm text-muted-foreground">{arrivalDateTime.date}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Total Duration</span>
                          </div>
                          <div className="font-medium">{optionDetails.duration}</div>
                          <div className="text-sm text-muted-foreground">
                            {routeOption.length > 1
                              ? `${routeOption.length - 1} connection${routeOption.length > 2 ? "s" : ""}`
                              : "Direct route"}
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                          <div className="text-sm">
                            <Badge variant="outline">
                              {routeOption.reduce((total, route) => total + route.availableSeats, 0)} seats available
                            </Badge>
                          </div>
                          <Button
                            className="mt-2"
                            onClick={() => {
                                const transportIds = routeOption.map((route) => route.id)
                                reserveTicket(transportIds)
                            }}
                            >
                            Select
                            </Button>
                        </div>
                      </div>

                      {routeOption.length > 0 && (
                        <Accordion type="single" collapsible className="mt-4">
                          <AccordionItem value="segments">
                            <AccordionTrigger>View Route Details</AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-6 pt-2">
                                {routeOption.map((route, index) => {
                                  const routeEndpoints = getRouteEndpoints(route)
                                  const routeTimes = getRouteTimes(route)
                                  const departureInfo = formatDateTime(routeTimes.departureTime)
                                  const arrivalInfo = formatDateTime(routeTimes.arrivalTime)

                                  return (
                                    <div key={index} className="border-t pt-4 first:border-t-0 first:pt-0">
                                      <div className="flex items-center gap-2 mb-4">
                                        <div
                                          className={cn(
                                            "rounded-full p-1",
                                            getTransportColorClass(route.transportType),
                                          )}
                                        >
                                          {getTransportIcon(route.transportType)}
                                        </div>
                                        <span className="font-medium">{route.transportType}</span>
                                        <span className="text-xs text-muted-foreground">ID: {route.transportId}</span>
                                        <Badge
                                          variant="outline"
                                          className={
                                            route.status === "ACTIVE"
                                              ? "bg-green-100 text-green-800"
                                              : "bg-amber-100 text-amber-800"
                                          }
                                        >
                                          {route.status}
                                        </Badge>
                                        <Badge className="ml-auto">{route.availableSeats} seats</Badge>
                                      </div>

                                      <div className="space-y-4">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                          <div className="space-y-1">
                                            <div className="text-sm text-muted-foreground">From</div>
                                            <div className="font-medium capitalize">{routeEndpoints.departure}</div>
                                            <div className="text-sm">{departureInfo.time}</div>
                                          </div>
                                          <div className="space-y-1">
                                            <div className="text-sm text-muted-foreground">To</div>
                                            <div className="font-medium capitalize">{routeEndpoints.arrival}</div>
                                            <div className="text-sm">{arrivalInfo.time}</div>
                                          </div>
                                          <div className="space-y-1">
                                            <div className="text-sm text-muted-foreground">Duration</div>
                                            <div className="font-medium">
                                              {calculateDuration(routeTimes.departureTime, routeTimes.arrivalTime)}
                                            </div>
                                          </div>
                                          <div className="space-y-1">
                                            <div className="text-sm text-muted-foreground">Stops</div>
                                            <div className="font-medium">
                                              {route.stops.length - 2} intermediate stops
                                            </div>
                                          </div>
                                        </div>

                                        {route.stops.length > 0 && (
                                          <div className="mt-4">
                                            <h4 className="text-sm font-medium mb-2">Stop Details</h4>
                                            <div className="space-y-2">
                                              {route.stops.map((stop, stopIndex) => {
                                                const stopArrival = formatDateTime(stop.arrivalTime)
                                                const stopDeparture = formatDateTime(stop.departureTime)

                                                return (
                                                  <div
                                                    key={stopIndex}
                                                    className="flex items-start gap-2 p-2 rounded-md bg-muted/50"
                                                  >
                                                    <div
                                                      className={cn(
                                                        "mt-1 h-2 w-2 rounded-full",
                                                        stopIndex === 0
                                                          ? "bg-green-500"
                                                          : stopIndex === route.stops.length - 1
                                                            ? "bg-red-500"
                                                            : "bg-blue-500",
                                                      )}
                                                    />
                                                    <div className="flex-1">
                                                      <div className="flex justify-between">
                                                        <span className="font-medium capitalize">{stop.location}</span>
                                                        <span className="text-xs text-muted-foreground">
                                                          {stopIndex === 0
                                                            ? "Departure"
                                                            : stopIndex === route.stops.length - 1
                                                              ? "Arrival"
                                                              : "Stop"}
                                                        </span>
                                                      </div>
                                                      <div className="flex justify-between text-sm">
                                                        <div>
                                                          {stop.arrivalTime && (
                                                            <span className="text-muted-foreground">
                                                              Arrival: {stopArrival.time}
                                                            </span>
                                                          )}
                                                        </div>
                                                        <div>
                                                          {stop.departureTime && (
                                                            <span className="text-muted-foreground">
                                                              Departure: {stopDeparture.time}
                                                            </span>
                                                          )}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                )
                                              })}
                                            </div>
                                          </div>
                                        )}
                                      </div>

                                      {index < routeOption.length - 1 && (
                                        <div className="flex items-center justify-center my-4">
                                          <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-amber-100 text-amber-800">
                                            <AlertCircle className="h-4 w-4" />
                                            <span className="text-sm font-medium">Connection required</span>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )
                                })}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
