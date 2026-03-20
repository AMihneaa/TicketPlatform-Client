import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const cities = [
  "Bucuresti",
  "Constanta",
  "Cluj-Napoca",
  "Timisoara",
  "Iasi",
  "Brasov",
];

export default function QuickSearchSection() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to) return;

    navigate("/routes/search", {
      state: {
        departure: from,
        arrival: to,
      },
    });
  };

  return (
    <Card className="border-slate-800 bg-slate-950/90 text-slate-100 shadow-xl backdrop-blur-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">
          Quick search
        </CardTitle>
        <CardDescription className="text-xs text-slate-400">
          Find your route and book tickets instantly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 md:grid-cols-[1.2fr,1.2fr,auto] items-end"
        >
          <div className="text-left space-y-1">
            <label className="text-xs font-medium text-slate-300">
              From
            </label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500"
            >
              <option value="">Select departure</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="text-left space-y-1">
            <label className="text-xs font-medium text-slate-300">
              To
            </label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500"
            >
              <option value="">Select destination</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <Button
            type="submit"
            className="h-[42px] w-full bg-sky-500 text-slate-950 hover:bg-sky-400 font-semibold"
          >
            Search
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
