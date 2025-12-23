import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RouteSearchForm from "@/component/route-search-form.component";
import RouteResults from "@/component/route-result.component";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Stop {
  location: string;
  arrivalTime: string | null;
  departureTime: string | null;
}

interface Route {
  stops: Stop[];
  transportId: string;
  transportType: "BUS" | "TRAIN" | "AIRPLANE";
  availableSeats: number;
  id: string;
  status: string;
}

export default function RouteSearchPage() {
  const [routes, setRoutes] = useState<Route[][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { departure, arrival } = (location.state || {}) as {
    departure?: string;
    arrival?: string;
  };

  const isAuthenticated = !!localStorage.getItem("Authorization");

  useEffect(() => {
    if (departure && arrival && isAuthenticated) {
      handleSearch(departure, arrival);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departure, arrival, isAuthenticated]);

  const handleSearch = async (departure: string, arrival: string) => {
    if (!isAuthenticated) {
      navigate("/login?redirect=/routes/search");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSearchPerformed(true);

    try {
      const response = await fetch(
        `https://47287039-bf8e-4eb6-a406-71bfe9007b4f.eu-central-1.cloud.genez.io/reservation/user/${encodeURIComponent(
          departure
        )}/to/${encodeURIComponent(arrival)}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error(
            "You are not authorized to view these routes. Please log in again."
          );
        } else if (response.status === 404) {
          throw new Error("No routes found for the selected locations.");
        } else {
          throw new Error("An error occurred while fetching routes.");
        }
      }

      const data = await response.json();
      setRoutes(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch routes"
      );
      setRoutes([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-10 md:py-14">
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex max-w-5xl flex-col gap-8">
          {/* Titlu */}
          <header className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
              Find routes
            </h1>
            <p className="text-sm text-slate-300 md:text-base">
              Search and compare bus, train and flight routes between cities.
            </p>
          </header>

          {/* Card de căutare */}
          <Card className="border-slate-800 bg-slate-950/70 shadow-xl backdrop-blur">
            <CardContent className="pt-6">
              <RouteSearchForm onSearch={handleSearch} isLoading={isLoading} />
            </CardContent>
          </Card>

          {/* Loading */}
          {isLoading && (
            <div className="flex items-center justify-center gap-3 py-10">
              <Loader2 className="h-6 w-6 animate-spin text-sky-400" />
              <span className="text-sm text-slate-300">
                Loading routes...
              </span>
            </div>
          )}

          {/* Eroare */}
          {error && (
            <Alert variant="destructive" className="border-red-500/40">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Fără rezultate */}
          {!isLoading && !error && searchPerformed && routes.length === 0 && (
            <Card className="border-slate-800 bg-slate-950/70">
              <CardContent className="py-10 text-center">
                <p className="text-sm text-slate-300">
                  No routes found for the selected locations.
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Try different locations or check back later.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Rezultate */}
          {!isLoading && !error && routes.length > 0 && (
            <section className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-semibold text-slate-50">
                  Available routes
                </h2>
                <p className="text-xs text-slate-400">
                  Found {routes.length} option
                  {routes.length > 1 ? "s" : ""}{" "}
                  {departure && arrival && (
                    <>
                      for{" "}
                      <span className="font-medium text-slate-200">
                        {departure} → {arrival}
                      </span>
                    </>
                  )}
                </p>
              </div>

              <RouteResults routeOptions={routes} />
            </section>
          )}
        </div>
      </div>
    </section>
  );
}
