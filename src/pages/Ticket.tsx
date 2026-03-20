import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { NormalizedReservation } from "@/lib/types";

type RawResponse = Record<
  string,
  Record<
    string,
    {
      "Reservation Status": "ACTIVE" | "INACTIVE";
      "Routes": string[];
    }
  >
>;

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<NormalizedReservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem("Authorization");

      if (!token) {
        setError("You need to be logged in to view your tickets.");
        setIsLoading(false);
        return;
      }

      try {
        const API_URL = import.meta.env.VITE_BACK_END_URL;
        const response = await fetch(`${API_URL}/reservation/user/myTicket`, {
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
      } catch (err) {
        console.error("Failed to fetch tickets:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch tickets. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const upcoming = tickets.filter((t) => t.reservationStatus === "ACTIVE");
  const completed = tickets.filter((t) => t.reservationStatus === "INACTIVE");

  return (
    <section className="py-10 md:py-14">
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <header className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
              My tickets
            </h1>
            <p className="text-sm text-slate-300 md:text-base">
              View your upcoming and completed reservations.
            </p>
          </header>

          {error && (
            <Alert variant="destructive" className="border-red-500/40">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isLoading && (
            <div className="flex items-center justify-center gap-3 py-10">
              <Loader2 className="h-6 w-6 animate-spin text-sky-400" />
              <span className="text-sm text-slate-300">
                Loading your tickets...
              </span>
            </div>
          )}

          {!isLoading && !error && (
            <Card className="border-slate-800 bg-slate-950/70 shadow-xl backdrop-blur">
              <CardContent className="pt-6">
                <Tabs defaultValue="upcoming" className="w-full">
                  <TabsList className="mb-4 grid w-full grid-cols-2 bg-slate-900">
                    <TabsTrigger value="upcoming">
                      Upcoming ({upcoming.length})
                    </TabsTrigger>
                    <TabsTrigger value="completed">
                      Completed ({completed.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upcoming">
                    {upcoming.length === 0 ? (
                      <EmptyState
                        title="No upcoming tickets"
                        description="You don't have any active reservations at the moment."
                      />
                    ) : (
                      <div className="space-y-4">
                        {upcoming.map((ticket) => (
                          <TicketCard key={ticket.id} ticket={ticket} />
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="completed">
                    {completed.length === 0 ? (
                      <EmptyState
                        title="No completed tickets"
                        description="Completed or past reservations will appear here."
                      />
                    ) : (
                      <div className="space-y-4">
                        {completed.map((ticket) => (
                          <TicketCard key={ticket.id} ticket={ticket} />
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
      <p className="text-sm font-medium text-slate-100">{title}</p>
      <p className="max-w-md text-xs text-slate-400">{description}</p>
    </div>
  );
}

function TicketCard({ ticket }: { ticket: NormalizedReservation }) {
  const from = ticket.routes[0];
  const to = ticket.routes[ticket.routes.length - 1];

  const isActive = ticket.reservationStatus === "ACTIVE";
  const statusLabel = isActive ? "Active" : "Completed";

  return (
    <Card className="border-slate-800 bg-slate-950/80 text-slate-50 transition-transform duration-150 hover:-translate-y-[2px] hover:border-sky-500/60 hover:shadow-xl">
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge
              className={isActive ? "bg-emerald-500/20 text-emerald-300" : ""}
              variant={isActive ? "default" : "outline"}
            >
              {statusLabel}
            </Badge>
            <Badge variant="outline" className="text-[0.7rem] uppercase">
              {ticket.transportType}
            </Badge>
          </div>
          <span className="text-xs text-slate-500">#{ticket.id}</span>
        </div>

        <div className="grid grid-cols-1 gap-3 text-sm text-slate-200 md:grid-cols-3">
          <div>
            <div className="text-[0.7rem] uppercase text-slate-500">From</div>
            <div className="font-semibold capitalize">{from}</div>
          </div>
          <div>
            <div className="text-[0.7rem] uppercase text-slate-500">To</div>
            <div className="font-semibold capitalize">{to}</div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span className="text-[0.75rem] text-slate-400">
              Last update: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="text-xs text-slate-400">
          Route: {ticket.routes.join(" → ")}
        </div>
      </CardContent>
    </Card>
  );
}
