import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      <div className="mb-4 rounded-full bg-muted p-6">
        <AlertTriangle className="h-10 w-10 text-muted-foreground" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-2">Page Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button  size="lg">
          <Link to="/">Go Home</Link>
        </Button>
        <Button variant="outline"  size="lg">
          <Link to="/routes">Browse Routes</Link>
        </Button>
      </div>
    </div>
  )
}
