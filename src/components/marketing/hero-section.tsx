"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ParallaxBlob } from "@/components/motion/parallax-blob";

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

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center overflow-hidden px-4 py-28 text-center sm:py-36">
      <ParallaxBlob
        className="-left-32 top-0 bg-primary"
        speed={0.4}
      />
      <ParallaxBlob
        className="-right-32 top-40 bg-blue-500"
        speed={0.25}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-3xl flex-col items-center"
      >
        <motion.p
          variants={item}
          className="text-sm font-medium uppercase tracking-wide text-primary"
        >
          Secure event ticketing
        </motion.p>
        <motion.h1
          variants={item}
          className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl"
        >
          Your ticket isn&apos;t a screenshot.
          <br />
          It&apos;s proof.
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-5 max-w-xl text-lg text-muted-foreground"
        >
          Eventra replaces forwarded screenshots and printable PDFs with a
          ticket that only works once — scanned, verified, done.
        </motion.p>
        <motion.div
          variants={item}
          className="mt-9 flex flex-wrap justify-center gap-3"
        >
          <Button size="lg" nativeButton={false} render={<Link href="/events" />}>
            I&apos;m attending an event
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href="/organizers" />}
          >
            I&apos;m organizing one
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
