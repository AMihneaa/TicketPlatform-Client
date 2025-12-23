import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { UserPlus } from "lucide-react";

export default function UserRegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12 px-6 py-16">
        {/* Text stanga */}
        <div className="flex-1 text-center md:text-left space-y-5">
          <p className="tracking-widest text-xs text-sky-400 uppercase">
            Create Account
          </p>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Start your <span className="text-sky-400">next journey</span> with us.
          </h1>
          <p className="max-w-md text-slate-400 text-sm">
            One account for booking and managing bus, train and flight tickets in one place.
          </p>
          <p className="text-xs text-slate-600">
            Fast registration • Secure data • No spam
          </p>
        </div>

        {/* Card dreapta */}
        <Card className="flex-1 border-slate-800 bg-slate-950/70 backdrop-blur-sm shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/10">
              <UserPlus className="h-5 w-5 text-sky-400" />
            </div>
            <CardTitle className="text-lg font-semibold">Create a new account</CardTitle>
            <p className="text-sm text-slate-400">
              Register to book and manage your tickets across all transport types.
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <label className="text-xs text-slate-300 mb-1 block">Full name</label>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-900 border-slate-700 text-slate-100"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 mb-1 block">Email address</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-900 border-slate-700 text-slate-100"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 mb-1 block">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-900 border-slate-700 text-slate-100"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button className="w-full bg-sky-500 text-slate-950 hover:bg-sky-400 font-semibold">
              Register
            </Button>
            <p className="text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="text-sky-400 hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
