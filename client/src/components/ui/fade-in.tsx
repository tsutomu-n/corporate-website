import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={cn("will-change-transform", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface FadeInStaggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  staggerDelay?: number;
  childrenDelay?: number;
}

export function FadeInStagger({
  children,
  staggerDelay = 0.05,
  childrenDelay = 0,
  ...props
}: FadeInStaggerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: staggerDelay, delayChildren: childrenDelay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
