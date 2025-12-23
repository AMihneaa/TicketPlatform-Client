import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { LogIn } from "lucide-react";

export default function UserLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12 px-6 py-16">
        {/* Text stanga */}
        <div className="flex-1 text-center md:text-left space-y-5">
          <p className="tracking-widest text-xs text-sky-400 uppercase">
            Travel Platform
          </p>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            One place for all <span className="text-sky-400">your journeys</span>.
          </h1>
          <p className="max-w-md text-slate-400 text-sm">
            Keep track of your tickets, routes and upcoming trips with a simple and elegant interface.
          </p>
          <p className="text-xs text-slate-600">
            Secure login • No extra fees • Instant access
          </p>
        </div>

    try {
      const API_URL = import.meta.env.VITE_BACK_END_URL;
      const response = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log("Response:", response);

        {/* Card dreapta */}
        <Card className="flex-1 border-slate-800 bg-slate-950/70 backdrop-blur-sm shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/10">
              <LogIn className="h-5 w-5 text-sky-400" />
            </div>
            <CardTitle className="text-lg font-semibold">Sign in to your account</CardTitle>
            <p className="text-sm text-slate-400">
              Access your tickets, active routes and travel assistant.
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <label className="text-xs text-slate-300 mb-1 block">Username</label>
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              Login
            </Button>
            <p className="text-center text-sm text-slate-400">
              Don’t have an account?{" "}
              <Link to="/register" className="text-sky-400 hover:underline">
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
