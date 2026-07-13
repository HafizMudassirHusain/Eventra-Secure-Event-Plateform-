"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ShieldCheck, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

const collageBlocks = [
  "from-primary/70 to-primary/40",
  "from-blue-500/70 to-blue-500/30",
  "from-violet-500/70 to-violet-500/30",
  "from-primary/50 to-blue-500/40",
];

export function HeroSection() {
  return (
    <section className="overflow-hidden px-4 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="text-sm font-medium uppercase tracking-wide text-primary"
          >
            All the fun starts here
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            Book your tickets for the event.
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-5 max-w-md text-lg text-muted-foreground"
          >
            Browse events, register in minutes, and walk in with a ticket
            that&apos;s genuinely yours.
          </motion.p>

          <motion.ul variants={item} className="mt-6 space-y-3">
            <li className="flex items-center gap-2 text-sm">
              <ShieldCheck className="size-4 shrink-0 text-primary" />
              Secure, single-use QR tickets
            </li>
            <li className="flex items-center gap-2 text-sm">
              <CreditCard className="size-4 shrink-0 text-primary" />
              Real payments via Stripe, confirmed instantly
            </li>
          </motion.ul>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <Button size="lg" nativeButton={false} render={<Link href="/events" />}>
              Browse events
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/organizers" />}
            >
              Start organizing
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="grid grid-cols-2 gap-4"
        >
          {collageBlocks.map((gradient, i) => (
            <div
              key={gradient}
              className={`aspect-square rounded-2xl bg-linear-to-br ${gradient} ${
                i === 1 || i === 2 ? "mt-8" : ""
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
