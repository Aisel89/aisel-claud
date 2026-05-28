import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "beige" | "sage";
}) {
  const variants = {
    default: "bg-brand-cream",
    beige: "bg-brand-beige",
    sage: "bg-brand-sage text-white",
  };

  return (
    <section
      id={id}
      className={cn("py-16 md:py-24", variants[variant], className)}
    >
      {children}
    </section>
  );
}
