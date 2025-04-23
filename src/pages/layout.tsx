import { Outlet } from "react-router-dom"
import Navbar from "@/component/navbar.component"
import Footer from "@/component/footer.component"
import { ThemeProvider } from "@/component/theme-provider.component"
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <Toaster />
      </div>
    </ThemeProvider>
  )
}
