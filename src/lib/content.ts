export const COMPANY = {
  name: "Ro-Mac Logistics",
  legal: "Ro-Mac Transportation, Inc.",
  dba: "DBA Ro-Mac Logistics",
  phone: "(816) 505-4405",
  phoneHref: "tel:+18165054405",
  email: "dispatch@ro-mactransport.com",
  mc: "273349",
  founded: "1991",
  address: ["3709 N Belt Hwy, Suite C", "Saint Joseph, MO 64506"],
  maps: "https://maps.google.com/?q=3709+N+Belt+Hwy+Suite+C+64506",
  news: {
    label: "Daily Logistics News",
    href: "https://zephyr-zinc-plum-clover.grok.me",
  },
} as const;

export const EQUIPMENT = [
  { id: "flatbed", label: "Flatbed" },
  { id: "hotshot", label: "40' flatbed hotshot" },
  { id: "step-deck", label: "Step deck" },
  { id: "rgn", label: "RGN" },
  { id: "lowboy", label: "Lowboy" },
  { id: "oversized", label: "Oversized" },
  { id: "sprinter", label: "Expedited Sprinter van" },
  { id: "box-truck", label: "Box truck" },
  { id: "dry-van", label: "Dry van" },
  { id: "other", label: "Other / not sure" },
] as const;

export type EquipmentId = (typeof EQUIPMENT)[number]["id"];

export function equipmentLabel(id: string) {
  return EQUIPMENT.find((item) => item.id === id)?.label ?? id;
}

export const STATES = [
  ["AL", "Alabama"],
  ["AZ", "Arizona"],
  ["AR", "Arkansas"],
  ["CA", "California"],
  ["CO", "Colorado"],
  ["CT", "Connecticut"],
  ["DE", "Delaware"],
  ["DC", "District of Columbia"],
  ["FL", "Florida"],
  ["GA", "Georgia"],
  ["ID", "Idaho"],
  ["IL", "Illinois"],
  ["IN", "Indiana"],
  ["IA", "Iowa"],
  ["KS", "Kansas"],
  ["KY", "Kentucky"],
  ["LA", "Louisiana"],
  ["ME", "Maine"],
  ["MD", "Maryland"],
  ["MA", "Massachusetts"],
  ["MI", "Michigan"],
  ["MN", "Minnesota"],
  ["MS", "Mississippi"],
  ["MO", "Missouri"],
  ["MT", "Montana"],
  ["NE", "Nebraska"],
  ["NV", "Nevada"],
  ["NH", "New Hampshire"],
  ["NJ", "New Jersey"],
  ["NM", "New Mexico"],
  ["NY", "New York"],
  ["NC", "North Carolina"],
  ["ND", "North Dakota"],
  ["OH", "Ohio"],
  ["OK", "Oklahoma"],
  ["OR", "Oregon"],
  ["PA", "Pennsylvania"],
  ["RI", "Rhode Island"],
  ["SC", "South Carolina"],
  ["SD", "South Dakota"],
  ["TN", "Tennessee"],
  ["TX", "Texas"],
  ["UT", "Utah"],
  ["VT", "Vermont"],
  ["VA", "Virginia"],
  ["WA", "Washington"],
  ["WV", "West Virginia"],
  ["WI", "Wisconsin"],
  ["WY", "Wyoming"],
] as const;

export function stateName(code: string) {
  return STATES.find(([abbr]) => abbr === code)?.[1] ?? code;
}

export const PRINCIPLES = [
  {
    index: "01",
    title: "Strict carrier vetting",
    body: "We don’t hand your freight to just anyone. Every carrier in our network has to clear our safety, insurance, and reliability standards before they ever see your dock.",
  },
  {
    index: "02",
    title: "Proactive tracking",
    body: "You are never left in the dark. We monitor the shipment from the moment it leaves your facility until it reaches the receiver.",
  },
  {
    index: "03",
    title: "One point of contact",
    body: "No phone tag with a rotating cast of dispatchers. One desk handles the communication and the problems, so your team can stay on production.",
  },
] as const;

export const MOVES = [
  {
    title: "40' flatbed hotshot",
    kicker: "1-ton dually",
    body: "A one-ton dually pickup on a 40-foot flatbed. This load is a generator.",
    image: "/media/hotshot.jpg",
    alt: "A one-ton dually pickup hooked to a flatbed trailer carrying a generator",
  },
  {
    title: "Flatbed",
    kicker: "Open deck",
    body: "A Peterbilt sleeper with tandem rear axles on a flatbed. This one is hauling pipe under a tarp.",
    image: "/media/flatbed.jpg",
    alt: "A Peterbilt sleeper with two rear axles hauling tarped pipe on a flatbed",
  },
  {
    title: "Step deck",
    kicker: "Drop deck",
    body: "A true 53-foot step deck. The deck drops once behind the upper deck so a taller piece can still clear.",
    image: "/media/stepdeck.jpg",
    alt: "A tractor hooked to a true 53-foot step-deck trailer",
  },
  {
    title: "Box truck",
    kicker: "Straight truck",
    body: "A conventional cab with a hood, not a cabover, when the freight does not need a trailer.",
    image: "/media/boxtruck.jpg",
    alt: "A conventional box truck with a hood, not a cabover",
  },
  {
    title: "Expedited Sprinter",
    kicker: "Van",
    body: "A high-roof cargo van when the shipment is small and it has to move now.",
    image: "/media/sprinter.jpg",
    alt: "A high-roof expedited cargo van on a highway",
  },
  {
    title: "Heavy machinery",
    kicker: "Double drop",
    body: "A sleeper tractor on a double drop for the tall, heavy piece — plant pumps and machines that will not sit on a standard deck.",
    image: "/media/machinery.jpg",
    alt: "A sleeper tractor hooked to a double-drop trailer carrying an industrial water-plant pump",
  },
] as const;

export const STEPS = [
  {
    index: "01",
    title: "Tell us the load",
    body: "Origin, destination, commodity, weight, and the day it has to leave. If it is odd-shaped, describe the piece.",
  },
  {
    index: "02",
    title: "We source and price it",
    body: "We find a carrier that already meets our standards and negotiate the rate before anyone is booked.",
  },
  {
    index: "03",
    title: "We stay on the truck",
    body: "One coordinator from pickup through delivery. If something shifts, you hear it from us — including when the news is not good.",
  },
] as const;

export const REGIONS = [
  {
    id: "midwest",
    name: "Midwest",
    summary: "The home territory. Hotshots, flatbeds, and regional runs across the plains and the Great Lakes.",
    lanes: ["Kansas City → Omaha", "Des Moines → Chicago", "St. Louis → Minneapolis"],
  },
  {
    id: "south",
    name: "South",
    summary: "Open-deck freight and expedited vans into plants, jobsites, and supply yards.",
    lanes: ["Kansas City → Dallas", "Omaha → Memphis", "Oklahoma City → Atlanta"],
  },
  {
    id: "west",
    name: "West",
    summary: "Machinery and commercial freight over the Rockies, when the piece and the calendar allow it.",
    lanes: ["Denver → Salt Lake City", "Kansas City → Phoenix", "Omaha → Boise"],
  },
  {
    id: "northeast",
    name: "Northeast",
    summary: "Longer lanes for shippers who want one coordinator instead of a phone tree.",
    lanes: ["St. Louis → Columbus", "Chicago → Pittsburgh", "Kansas City → Newark"],
  },
] as const;

export const SERVICES = [
  {
    index: "01",
    title: "Truckload brokerage",
    body: "Business-to-business freight across the contiguous United States. We find the truck, negotiate the rate, and manage the load so you don’t have to build a carrier network of your own.",
  },
  {
    index: "02",
    title: "The trucks we book",
    body: "40-foot flatbed hotshots behind a one-ton dually, full flatbeds, and step decks. Expedited Sprinter vans when the freight is small and the clock is not. Conventional box trucks — a hood, not a cabover — when a trailer is more truck than the load needs.",
  },
  {
    index: "03",
    title: "Heavy machinery & open deck",
    body: "A sleeper on a double drop, or a flatbed and step deck, for commercial equipment. Tell us the dimensions. We will tell you what the piece actually needs.",
  },
  {
    index: "04",
    title: "A single desk",
    body: "You are not passed between sales, tracking, and after-hours voicemail. The people who book the truck are the people who answer when it is late.",
  },
] as const;

export const READY = [
  "Shipper and receiver, with cities — a zip code saves a round of questions",
  "Commodity, weight, and pallet count, or the dimensions of a machine",
  "The day it can be loaded, and the day it has to deliver",
  "Dock limits: appointment, forklift, tarp, or a piece that only loads from the side",
  "Anything unusual — permits, temperature, or a trailer you are not sure about",
] as const;

export const TIMELINE = [
  {
    year: "1991",
    title: "Jennifer Rowe opens the company",
    body: "After years in air freight, she started Ro-Mac Transportation on a plain idea: the customer comes first, and the strength of the place is the people in it — not its size.",
  },
  {
    year: "2007",
    title: "Jason Davis joins the desk",
    body: "A former driver — local, over-the-road, and heavy equipment — who had already run operations. He still looks at a load from the dock, the cab, and the carrier at the same time.",
  },
  {
    year: "2021",
    title: "The company keeps her word",
    body: "Jennifer died in 2021. She is missed. The desk stayed open, on the terms she set: traditional values, and a motto she actually used — “My word is my bond.”",
  },
  {
    year: "2026",
    title: "A new office in Saint Joseph",
    body: "In March 2026 Ro-Mac relocated to a new office in Saint Joseph, Missouri, after many years in Parkville. Gabe Heard and Cody Rash still coordinate the loads beside Jason.",
  },
] as const;

export const TEAM = [
  {
    name: "Jason Davis",
    role: "President",
    since: "Joined 2007",
    body: "Jason started as a commercial driver and came inside as an operations manager before Ro-Mac. His rule for customers is blunt: “I always tell the truth, even if it’s not good news.”",
  },
  {
    name: "Gabe Heard",
    role: "Logistics coordinator",
    since: "Joined 2021",
    body: "Gabe was brought on in 2021 and has been a tremendous asset to Ro-Mac. He keeps the company’s core values.",
  },
  {
    name: "Cody Rash",
    role: "Logistics coordinator",
    since: "Joined 2023",
    body: "Cody is detail-first with both customers and carriers. He joined new to the industry and took to the desk quickly.",
  },
] as const;

export type LoadDraft = {
  ref: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  originCity: string;
  originState: string;
  destinationCity: string;
  destinationState: string;
  equipment: string;
  commodity: string;
  weight: string;
  pickup: string;
  notes: string;
  savedAt: string;
};

export const DRAFTS_KEY = "romac-load-drafts";

export function formatPlace(city: string, state: string) {
  const name = state ? stateName(state) : "";
  if (city && name) return `${city}, ${name}`;
  return city || name || "—";
}

export function briefText(draft: LoadDraft) {
  const lines = [
    `Ro-Mac Logistics — load brief ${draft.ref}`,
    `Name: ${draft.name}`,
    `Company: ${draft.company}`,
    `Email: ${draft.email}`,
    `Phone: ${draft.phone}`,
    `Origin: ${formatPlace(draft.originCity, draft.originState)}`,
    `Destination: ${formatPlace(draft.destinationCity, draft.destinationState)}`,
    `Equipment: ${equipmentLabel(draft.equipment)}`,
    `Commodity: ${draft.commodity}`,
    draft.weight ? `Weight / pieces: ${draft.weight}` : "",
    draft.pickup ? `Pickup date: ${draft.pickup}` : "",
    draft.notes ? `Notes: ${draft.notes}` : "",
  ];
  return lines.filter(Boolean).join("\n");
}

export function mailtoFor(draft: LoadDraft) {
  const subject = `Load request ${draft.ref} — ${formatPlace(draft.originCity, draft.originState)} to ${formatPlace(draft.destinationCity, draft.destinationState)}`;
  return `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(briefText(draft))}`;
}
