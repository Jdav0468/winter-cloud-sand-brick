import { cn } from "@/lib/cn";

export function Mark({ className }: { className?: string }) {
  return (
    <img
      src="/brand/logo-wall.jpg"
      alt="Ro-Mac Logistics"
      className={cn("brand-logo block h-20 w-auto max-w-[70vw] object-contain md:h-24", className)}
    />
  );
}
