import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { NormalizedReservation } from "@/lib/types";

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<NormalizedReservation[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("http://localhost:8080/reservation/user/myTicket", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
            "Content-Type": "application/json",
          },
        });

        const raw = await response.json() as Record<
          string,
          Record<
            string,
            {
              "Reservation Status": "ACTIVE" | "INACTIVE";
              "Routes": string[];
            }
          >
        >;

        const parsed: NormalizedReservation[] = Object.entries(raw).map(([id, transportMap]) => {
          const [transportType, details] = Object.entries(transportMap)[0];
          return {
            id,
            transportType,
            reservationStatus: details["Reservation Status"],
            routes: details["Routes"],
          };
        });

        setTickets(parsed);
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const upcoming = tickets.filter((t) => t.reservationStatus === "ACTIVE");
  const completed = tickets.filter((t) => t.reservationStatus === "INACTIVE");

  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">My Tickets</h1>
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-4 grid grid-cols-2 w-full">
          <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <div className="space-y-4">
            {upcoming.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="space-y-4">
            {completed.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TicketCard({ ticket }: { ticket: NormalizedReservation }) {
  const from = ticket.routes[0];
  const to = ticket.routes[ticket.routes.length - 1];

  return (
    <Card>
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <Badge>{ticket.reservationStatus}</Badge>
          <span className="text-sm text-muted-foreground">#{ticket.id}</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <div>
            <div className="text-sm text-muted-foreground">From</div>
            <div className="font-semibold capitalize">{from}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">To</div>
            <div className="font-semibold capitalize">{to}</div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">Transport: {ticket.transportType}</div>
      </CardContent>
    </Card>
  );
}
