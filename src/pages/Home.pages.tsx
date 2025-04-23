import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import IMAGE from "@/assets/imagine1.jpg"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Calendar,
  Clock,
} from "lucide-react"

export default function HomePage() {
  const newsItems = [
    {
      id: 1,
      title: "New Express Routes Added",
      description: "We've added 5 new express routes connecting major cities with faster travel times.",
      date: "May 15, 2023",
      category: "Routes",
    },
    {
      id: 2,
      title: "Summer Discount Program",
      description: "Get up to 25% off on all tickets booked for summer travel between June and August.",
      date: "May 10, 2023",
      category: "Promotions",
    },
    {
      id: 3,
      title: "Mobile App Update",
      description: "Our mobile app now features real-time tracking and instant notifications for your journey.",
      date: "May 5, 2023",
      category: "Technology",
    },
  ]

  const popularRoutes = [
    { id: 1, from: "New York", to: "Boston", price: "$45", duration: "4h 30m", departures: "Hourly" },
    { id: 2, from: "Los Angeles", to: "San Francisco", price: "$55", duration: "6h 15m", departures: "Every 2 hours" },
    { id: 3, from: "Chicago", to: "Detroit", price: "$35", duration: "5h 45m", departures: "4 times daily" },
    { id: 4, from: "Miami", to: "Orlando", price: "$30", duration: "3h 30m", departures: "6 times daily" },
  ]

  return (
    <div className="flex flex-col gap-12 pb-8">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Travel with Comfort and Convenience
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Book tickets for your journey with ease. Choose from thousands of routes, compare prices, and secure
                your seat in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg">
                  <Link to="/routes">Find Routes</Link>
                </Button>
                <Button variant="outline" size="lg" >
                  <Link to="/my-tickets">My Tickets</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
              <img
                src= {IMAGE}
                alt="Comfortable bus travel"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>Quick Search</CardTitle>
              <CardDescription>Find your route and book tickets instantly</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                <div className="space-y-2">
                  <label htmlFor="from" className="text-sm font-medium">From</label>
                  <select id="from" className="form-select">
                    <option value="">Select departure</option>
                    <option value="new-york">New York</option>
                    <option value="los-angeles">Los Angeles</option>
                    <option value="chicago">Chicago</option>
                    <option value="miami">Miami</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="to" className="text-sm font-medium">To</label>
                  <select id="to" className="form-select">
                    <option value="">Select destination</option>
                    <option value="boston">Boston</option>
                    <option value="san-francisco">San Francisco</option>
                    <option value="detroit">Detroit</option>
                    <option value="orlando">Orlando</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium">Date</label>
                  <input type="date" id="date" className="form-input" />
                </div>
                <div className="flex items-end">
                  <Button className="w-full">Search</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Popular Routes</h2>
              <p className="text-muted-foreground">Most frequently booked destinations</p>
            </div>
            <Button variant="ghost"  className="gap-1">
              <Link to="/routes">
                View all routes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularRoutes.map((route) => (
              <Card key={route.id}>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg flex justify-between items-start">
                    <div>
                      <span>{route.from}</span>
                      <span className="text-muted-foreground text-sm"> to </span>
                      <span>{route.to}</span>
                    </div>
                    <Badge>{route.price}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{route.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{route.departures}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button  className="w-full">
                    <Link to={`/routes/${route.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Latest News</h2>
              <p className="text-muted-foreground">Stay updated with TravelEase</p>
            </div>
            <Button variant="ghost"  className="gap-1">
              <Link to="/news">
                All news
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <Card key={item.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{item.category}</Badge>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="gap-1">
                    Read more
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
