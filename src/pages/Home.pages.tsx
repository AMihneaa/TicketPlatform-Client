import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import IMAGE from "@/assets/imagine1.jpg";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import QuickSearchSection from "@/component/quick-search.component";

const newsItems = [
  {
    id: 1,
    title: "New Express Routes Added",
    description:
      "Direct connections between major cities with shorter travel times and flexible departures.",
    date: "May 15",
    category: "Routes",
  },
  {
    id: 2,
    title: "Summer Discount Program",
    description:
      "Save up to 25% on tickets booked in advance for your summer trips.",
    date: "May 10",
    category: "Promotions",
  },
  {
    id: 3,
    title: "Live Travel Updates",
    description:
      "Get notified instantly about delays, gate changes or platform updates.",
    date: "May 5",
    category: "Updates",
  },
];

const popularRoutes = [
  {
    id: 1,
    from: "Bucuresti",
    to: "Constanta",
    price: "€25",
    duration: "2h 10m",
    departures: "Hourly",
  },
  {
    id: 2,
    from: "Cluj-Napoca",
    to: "Bucuresti",
    price: "€45",
    duration: "7h 30m",
    departures: "5 trips/day",
  },
  {
    id: 3,
    from: "Timisoara",
    to: "Vienna",
    price: "€60",
    duration: "5h 20m",
    departures: "3 trips/day",
  },
  {
    id: 4,
    from: "Iasi",
    to: "London",
    price: "€120",
    duration: "3h 40m",
    departures: "Daily",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* HERO */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/30 via-slate-900 to-slate-950" />
        <div className="absolute top-0 left-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="container relative z-10 mx-auto flex flex-col items-center justify-between gap-10 px-6 text-center md:flex-row md:text-left">
          {/* Text hero */}
          <div className="flex-1 space-y-5">
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Plan. Book.{" "}
              <span className="text-sky-400">Travel</span> with ease.
            </h1>
            <p className="max-w-lg text-sm text-slate-300 md:text-base">
              Compare routes, prices and travel times across bus, train and
              flights — all in a single, elegant interface designed to make
              planning your next journey effortless.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rounded-full bg-sky-500 px-8 font-semibold text-slate-950 hover:bg-sky-400"
                asChild
              >
                <Link to="/routes">Find a route</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-sky-500/50 px-8 font-semibold text-sky-400 hover:bg-sky-500/10"
                asChild
              >
                <Link to="/my-tickets">My tickets</Link>
              </Button>
            </div>

            <div className="flex gap-6 pt-4 text-sm text-slate-400">
              <div>
                <span className="font-medium text-sky-400">120+</span> Cities
                connected
              </div>
              <div>
                <span className="font-medium text-sky-400">3 modes</span> Bus ·
                Train · Flights
              </div>
              <div>
                <span className="font-medium text-sky-400">24/7</span> Smart
                assistant
              </div>
            </div>
          </div>

          {/* Imagine */}
          <div className="flex-1 max-w-md">
            <div className="relative overflow-hidden rounded-2xl shadow-[0_0_40px_-10px_rgba(56,189,248,0.5)]">
              <img
                src={IMAGE}
                alt="Travel world map"
                className="h-[360px] w-full object-cover opacity-90"
              />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-slate-900/90 to-transparent px-5 py-4">
                <p className="text-sm font-semibold text-sky-300">
                  Smart route finder
                </p>
                <p className="text-xs text-slate-300">
                  AI-assisted suggestions coming soon for the best connections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK SEARCH */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-2 text-3xl font-semibold">Quick search</h2>
          <p className="mb-10 text-sm text-slate-400">
            Start by selecting your departure and destination.
          </p>
          <div className="mx-auto max-w-3xl">
            <QuickSearchSection />
          </div>
        </div>
      </section>

      {/* POPULAR ROUTES */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-slate-100">
                Popular routes
              </h2>
              <p className="text-sm text-slate-400">
                Frequently booked journeys chosen by other travellers.
              </p>
            </div>

            <Button
              variant="ghost"
              className="text-sky-400 hover:text-sky-300"
              asChild
            >
              <Link to="/routes" className="inline-flex items-center gap-1">
                View all routes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {popularRoutes.map((route) => (
                <Card
                  key={route.id}
                  className="border-slate-800 bg-slate-950/70 transition-colors hover:border-sky-500/50"
                >
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="flex items-start justify-between text-base text-slate-100">
                      <span>
                        {route.from}{" "}
                        <span className="text-slate-500">→</span> {route.to}
                      </span>
                      <Badge className="bg-sky-500/20 text-sky-300">
                        {route.price}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 p-4 pt-0 text-sm text-slate-300">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-500" />
                      <span>{route.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      <span>{route.departures}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full bg-sky-500 text-slate-950 hover:bg-sky-400 font-semibold" asChild>
                      <Link to={`/routes/${route.id}`}>View details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LATEST UPDATES */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-slate-100">
                Latest updates
              </h2>
              <p className="text-sm text-slate-400">
                Stay informed about new routes, discounts and features.
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="text-slate-300 hover:bg-slate-800/80"
              asChild
            >
              <Link to="/news" className="inline-flex items-center gap-1">
                All news
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
              {newsItems.map((item) => (
                <Card
                  key={item.id}
                  className="border-slate-800 bg-slate-950/70 text-slate-50 transition-transform duration-150 hover:-translate-y-1 hover:border-sky-500/50 hover:shadow-xl"
                >
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="border-slate-600 text-[0.7rem] text-slate-200"
                      >
                        {item.category}
                      </Badge>
                      <span className="text-[0.7rem] text-slate-500">
                        {item.date}
                      </span>
                    </div>
                    <CardTitle className="text-sm font-semibold">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-slate-300">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
