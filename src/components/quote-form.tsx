import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Check, Copy, Mail, Phone } from "lucide-react";
import {
  COMPANY,
  DRAFTS_KEY,
  EQUIPMENT,
  STATES,
  briefText,
  equipmentLabel,
  formatPlace,
  mailtoFor,
  type LoadDraft,
} from "@/lib/content";

const fieldClass =
  "mt-2 w-full border border-line bg-paper px-3 py-3 text-base text-ink outline-none placeholder:text-muted";

type Errors = Partial<Record<"name" | "company" | "email" | "phone" | "originState" | "destinationState" | "commodity", string>>;

function readDrafts(): LoadDraft[] {
  try {
    const raw = localStorage.getItem(DRAFTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is LoadDraft => {
      return Boolean(item && typeof item === "object" && "ref" in item);
    });
  } catch {
    return [];
  }
}

export function QuoteForm({
  origin,
  destination,
  equipment,
  commodity,
}: {
  origin: string;
  destination: string;
  equipment: string;
  commodity: string;
}) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [originCity, setOriginCity] = useState("");
  const [originState, setOriginState] = useState(origin);
  const [destinationCity, setDestinationCity] = useState("");
  const [destinationState, setDestinationState] = useState(destination);
  const [equip, setEquip] = useState(equipment || "dry-van");
  const [goods, setGoods] = useState(commodity);
  const [weight, setWeight] = useState("");
  const [pickup, setPickup] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [ready, setReady] = useState<LoadDraft | null>(null);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<LoadDraft[]>([]);

  useEffect(() => {
    setHistory(readDrafts());
  }, []);

  const mailto = useMemo(() => (ready ? mailtoFor(ready) : ""), [ready]);

  function validate(): Errors {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Add the name of the person we should call.";
    if (company.trim().length < 2) next.company = "Add the company shipping the freight.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Use a real email so we can reply.";
    if (phone.replace(/\D/g, "").length < 10) next.phone = "Add a phone number with area code.";
    if (!originState) next.originState = "Choose an origin state.";
    if (!destinationState) next.destinationState = "Choose a destination state.";
    if (goods.trim().length < 2) next.commodity = "Tell us what is moving.";
    return next;
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setReady(null);
      return;
    }
    const draft: LoadDraft = {
      ref: `RM-${Date.now().toString(36).toUpperCase().slice(-5)}`,
      name: name.trim(),
      company: company.trim(),
      email: email.trim(),
      phone: phone.trim(),
      originCity: originCity.trim(),
      originState,
      destinationCity: destinationCity.trim(),
      destinationState,
      equipment: equip,
      commodity: goods.trim(),
      weight: weight.trim(),
      pickup,
      notes: notes.trim(),
      savedAt: new Date().toISOString(),
    };
    const drafts = [draft, ...readDrafts()].slice(0, 6);
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
    setHistory(drafts);
    setReady(draft);
    setCopied(false);
  }

  async function copyBrief() {
    if (!ready) return;
    try {
      await navigator.clipboard.writeText(briefText(ready));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <form className="border border-line bg-cream p-5 md:p-7 lg:col-span-7" onSubmit={onSubmit} noValidate>
        <div className="border-b border-line pb-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">Dispatch brief</p>
          <h2 className="mt-2 font-display text-3xl">Tell the desk what is moving</h2>
        </div>

        <fieldset className="mt-6 grid gap-4 sm:grid-cols-2">
          <legend className="sr-only">Contact</legend>
          <Field label="Your name" error={errors.name}>
            <input className={fieldClass} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </Field>
          <Field label="Company" error={errors.company}>
            <input className={fieldClass} value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" />
          </Field>
          <Field label="Email" error={errors.email}>
            <input className={fieldClass} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </Field>
          <Field label="Phone" error={errors.phone}>
            <input className={fieldClass} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
          </Field>
        </fieldset>

        <fieldset className="mt-6 grid gap-4 sm:grid-cols-2">
          <legend className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted">Lane</legend>
          <Field label="Origin city">
            <input className={fieldClass} value={originCity} onChange={(e) => setOriginCity(e.target.value)} placeholder="City" />
          </Field>
          <Field label="Origin state" error={errors.originState}>
            <StateSelect value={originState} onChange={setOriginState} />
          </Field>
          <Field label="Destination city">
            <input className={fieldClass} value={destinationCity} onChange={(e) => setDestinationCity(e.target.value)} />
          </Field>
          <Field label="Destination state" error={errors.destinationState}>
            <StateSelect value={destinationState} onChange={setDestinationState} />
          </Field>
        </fieldset>

        <fieldset className="mt-6 grid gap-4 sm:grid-cols-2">
          <legend className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted">Freight</legend>
          <Field label="Equipment">
            <select className={fieldClass} value={equip} onChange={(e) => setEquip(e.target.value)}>
              {EQUIPMENT.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Commodity" error={errors.commodity}>
            <input className={fieldClass} value={goods} onChange={(e) => setGoods(e.target.value)} />
          </Field>
          <Field label="Weight or piece count">
            <input className={fieldClass} value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="42,000 lb · 18 pallets" />
          </Field>
          <Field label="Pickup date">
            <input className={fieldClass} type="date" value={pickup} onChange={(e) => setPickup(e.target.value)} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Dock notes">
              <textarea
                className={`${fieldClass} min-h-28 resize-y`}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Appointment window, tarp, forklift, height, anything odd."
              />
            </Field>
          </div>
        </fieldset>

        <button
          type="submit"
          className="mt-6 inline-flex min-h-11 w-full items-center justify-center bg-pine px-5 text-sm font-semibold text-cream transition-colors duration-200 hover:bg-pine-deep sm:w-auto"
        >
          Prepare this brief
        </button>
        <p className="mt-3 text-sm leading-6 text-muted">
          This stays on your device and opens an email to {COMPANY.email}. We do not book a truck from the website.
        </p>
      </form>

      <aside className="lg:col-span-5">
        {ready ? (
          <div className="border border-pine bg-sand text-ink">
            <div className="border-b border-line px-5 py-4 md:px-6">
              <p className="font-display text-xs font-semibold tracking-widest text-pine">Ready to send</p>
              <p className="mt-2 font-display text-3xl">{ready.ref}</p>
            </div>
            <dl className="space-y-3 px-5 py-5 text-sm md:px-6">
              <Row label="Lane" value={`${formatPlace(ready.originCity, ready.originState)} → ${formatPlace(ready.destinationCity, ready.destinationState)}`} />
              <Row label="Equipment" value={equipmentLabel(ready.equipment)} />
              <Row label="Commodity" value={ready.commodity} />
              <Row label="Contact" value={`${ready.name}, ${ready.company}`} />
            </dl>
            <div className="flex flex-col gap-3 px-5 pb-6 md:px-6">
              <a
                href={mailto}
                className="inline-flex min-h-11 items-center justify-center gap-2 bg-pine px-4 text-sm font-semibold text-paper"
              >
                <Mail className="size-4" aria-hidden="true" />
                Email dispatch
              </a>
              <button
                type="button"
                onClick={() => void copyBrief()}
                className="inline-flex min-h-11 items-center justify-center gap-2 border border-line px-4 text-sm font-semibold text-ink"
              >
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copied ? "Copied" : "Copy the brief"}
              </button>
              <a href={COMPANY.phoneHref} className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-semibold">
                <Phone className="size-4" aria-hidden="true" />
                Or call {COMPANY.phone}
              </a>
            </div>
          </div>
        ) : (
          <div className="border border-line bg-sand/50 p-5 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">Prefer the phone</p>
            <p className="mt-3 font-display text-3xl text-ink">The desk still answers.</p>
            <p className="mt-3 text-sm leading-6 text-muted">
              If the freight is today, call. Someone on the desk will tell you whether we can cover it.
            </p>
            <a
              href={COMPANY.phoneHref}
              className="mt-5 inline-flex min-h-11 items-center gap-2 bg-pine px-4 text-sm font-semibold text-cream"
            >
              <Phone className="size-4" aria-hidden="true" />
              {COMPANY.phone}
            </a>
            <p className="mt-4 text-sm text-muted">{COMPANY.email}</p>
          </div>
        )}

        {history.length > 0 ? (
          <div className="mt-6 border border-line">
            <p className="border-b border-line px-5 py-3 text-xs font-semibold uppercase tracking-widest text-muted">
              On this device
            </p>
            <ul>
              {history.map((draft) => (
                <li key={draft.ref} className="border-b border-line px-5 py-4 last:border-b-0">
                  <p className="text-sm font-semibold text-ink">{draft.ref}</p>
                  <p className="mt-1 text-sm text-muted">
                    {formatPlace(draft.originCity, draft.originState)} → {formatPlace(draft.destinationCity, draft.destinationState)}
                  </p>
                  <button
                    type="button"
                    className="mt-2 text-sm font-semibold text-pine underline decoration-copper underline-offset-4"
                    onClick={() => {
                      setReady(draft);
                      setCopied(false);
                    }}
                  >
                    Reopen brief
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </aside>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink">
        {label}
        {children}
      </label>
      {error ? <span className="mt-1 block text-sm font-medium text-pine">{error}</span> : null}
    </div>
  );
}

function StateSelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <select className={fieldClass} value={value} onChange={(event) => onChange(event.target.value)}>
      <option value="">Select</option>
      {STATES.map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-mist">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
