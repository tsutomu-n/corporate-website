import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gradient-to-r from-muted/60 via-muted to-muted/60 bg-[length:200%_100%] animate-[pulse_2s_ease-in-out_infinite]",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }