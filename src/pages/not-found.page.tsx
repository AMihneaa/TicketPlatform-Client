import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-gradient-to-b from-background via-muted/50 to-background px-4 py-20 text-center">
      <div className="mb-8 flex flex-col items-center justify-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <AlertTriangle className="h-10 w-10 text-primary" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-3 max-w-md text-muted-foreground sm:text-lg">
          Sorry, we couldn’t find the page you were looking for.
          <br />
          It might have been moved, deleted, or never existed.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" asChild>
          <Link to="/">Go Home</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link to="/routes">Browse Routes</Link>
        </Button>
      </div>
    </section>
  )
}
