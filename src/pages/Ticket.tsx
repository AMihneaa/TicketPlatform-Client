/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Calendar,
  Clock,
  Download,
  MapPin,
  QrCode,
  Ticket,
  User,
  Users
} from "lucide-react"

export default function MyTicketsPage() {
  const tickets = [
    {
      id: "TKT-12345",
      from: "New York",
      to: "Boston",
      date: "2023-06-15",
      departureTime: "08:00 AM",
      arrivalTime: "12:30 PM",
      passengers: 1,
      status: "upcoming",
      price: "$45",
    },
    {
      id: "TKT-12346",
      from: "Chicago",
      to: "Detroit",
      date: "2023-06-20",
      departureTime: "09:15 AM",
      arrivalTime: "03:00 PM",
      passengers: 2,
      status: "upcoming",
      price: "$70",
    },
    {
      id: "TKT-12347",
      from: "Miami",
      to: "Orlando",
      date: "2023-05-10",
      departureTime: "10:00 AM",
      arrivalTime: "01:30 PM",
      passengers: 3,
      status: "completed",
      price: "$90",
    },
    {
      id: "TKT-12348",
      from: "Los Angeles",
      to: "San Francisco",
      date: "2023-05-05",
      departureTime: "07:30 AM",
      arrivalTime: "01:45 PM",
      passengers: 1,
      status: "completed",
      price: "$55",
    },
  ]

  const [activeTicket, setActiveTicket] = useState<string | null>(null)

  const upcomingTickets = tickets.filter(ticket => ticket.status === "upcoming")
  const completedTickets = tickets.filter(ticket => ticket.status === "completed")

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Tickets</h1>
          <p className="text-muted-foreground">Manage your booked tickets</p>
        </div>

        {tickets.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent className="flex flex-col items-center gap-4">
              <div className="rounded-full bg-muted p-6">
                <Ticket className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold">No Tickets Found</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                You haven't booked any tickets yet. Start exploring routes and book your first journey.
              </p>
              <Button  className="mt-4">
                <Link to="/routes">Find Routes</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="upcoming">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="upcoming">Upcoming ({upcomingTickets.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedTickets.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <div className="grid gap-4">
                {upcomingTickets.map(ticket => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    isActive={activeTicket === ticket.id}
                    onToggle={() => setActiveTicket(activeTicket === ticket.id ? null : ticket.id)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <div className="grid gap-4">
                {completedTickets.map(ticket => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    isActive={activeTicket === ticket.id}
                    onToggle={() => setActiveTicket(activeTicket === ticket.id ? null : ticket.id)}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}

function TicketCard({
  ticket,
  isActive,
  onToggle,
}: Readonly<{
  ticket: any
  isActive: boolean
  onToggle: () => void
}>) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-center">
          <Badge variant={ticket.status === "upcoming" ? "default" : "outline"}>
            {ticket.status === "upcoming" ? "Upcoming" : "Completed"}
          </Badge>
          <span className="text-sm text-muted-foreground">{ticket.id}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">From</div>
            <div className="font-medium">{ticket.from}</div>
            <div className="text-sm">{ticket.departureTime}</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">To</div>
            <div className="font-medium">{ticket.to}</div>
            <div className="text-sm">{ticket.arrivalTime}</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Date</span>
            </div>
            <div className="font-medium">
              {new Date(ticket.date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>
                {ticket.passengers} {ticket.passengers === 1 ? "passenger" : "passengers"}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end justify-between">
            <div className="text-xl font-bold">{ticket.price}</div>
            <Button variant="outline" size="sm" className="gap-1" onClick={onToggle}>
              {isActive ? "Hide Details" : "View Details"}
              <ArrowRight className={`h-4 w-4 transition-transform ${isActive ? "rotate-90" : ""}`} />
            </Button>
          </div>
        </div>
      </CardContent>

      {isActive && (
        <div className="bg-muted/50 p-4 border-t">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-medium">Ticket Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="text-muted-foreground">Ticket Number</div>
                  <div>{ticket.id}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-muted-foreground">Purchase Date</div>
                  <div>May 1, 2023</div>
                </div>
                <div className="space-y-1">
                  <div className="text-muted-foreground">Passenger</div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    John Doe
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-muted-foreground">Seat</div>
                  <div>Not assigned</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <QrCode className="h-4 w-4" />
                  Show QR
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Journey Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">{ticket.from} Bus Terminal</div>
                    <div className="text-muted-foreground">123 Main St, {ticket.from}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">{ticket.to} Bus Terminal</div>
                    <div className="text-muted-foreground">456 Oak St, {ticket.to}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">Duration</div>
                    <div className="text-muted-foreground">Approximately 4 hours 30 minutes</div>
                  </div>
                </div>
              </div>
              {ticket.status === "upcoming" && (
                <Button variant="destructive" size="sm">
                  Cancel Ticket
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
