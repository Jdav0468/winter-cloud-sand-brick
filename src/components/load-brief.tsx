import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { EQUIPMENT, STATES } from "@/lib/content";

const fieldClass =
  "mt-2 w-full border border-line bg-paper px-3 py-3 text-base text-ink outline-none";

export function LoadBrief() {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState("MO");
  const [destination, setDestination] = useState("");
  const [equipment, setEquipment] = useState("flatbed");
  const [commodity, setCommodity] = useState("");

  return (
    <form
      className="border border-line bg-cream p-5 md:p-7"
      onSubmit={(event) => {
        event.preventDefault();
        if (!origin || !destination || !equipment) return;
        void navigate({
          to: "/quote",
          search: { origin, destination, equipment, commodity },
        });
      }}
    >
      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">Load brief</p>
          <h2 className="mt-2 font-display text-3xl text-ink">Start with the lane</h2>
        </div>
        <p className="hidden text-right text-xs uppercase tracking-widest text-muted sm:block">
          Not a booking
        </p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          Origin state
          <select className={fieldClass} value={origin} onChange={(event) => setOrigin(event.target.value)}>
            {STATES.map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-ink">
          Destination state
          <select
            className={fieldClass}
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            required
          >
            <option value="">Select</option>
            {STATES.map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-ink">
          Equipment
          <select
            className={fieldClass}
            value={equipment}
            onChange={(event) => setEquipment(event.target.value)}
          >
            {EQUIPMENT.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-ink">
          Commodity
          <input
            className={fieldClass}
            value={commodity}
            onChange={(event) => setCommodity(event.target.value)}
            placeholder="Steel coils, palletized parts…"
            maxLength={80}
          />
        </label>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm leading-6 text-muted">
          We’ll open a full brief for the desk. Nothing is booked until we confirm a carrier and a rate.
        </p>
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center gap-2 bg-pine px-5 text-sm font-semibold text-cream transition-colors duration-200 hover:bg-pine-deep"
        >
          Continue to dispatch
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
