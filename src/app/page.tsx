import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/marketing/hero-section";
import { FeaturedEventsSection } from "@/components/marketing/featured-events-section";
import { HowItWorksPreview } from "@/components/marketing/how-it-works-preview";
import { TrustSection } from "@/components/marketing/trust-section";
import { AngledDivider } from "@/components/marketing/angled-divider";
import { Reveal } from "@/components/motion/reveal";

export default function Home() {
  return (
    <div>
      <HeroSection />

      <AngledDivider />

      {/* Featured events */}
      <section className="relative bg-muted/30 px-4 py-20 sm:py-28">
        <FeaturedEventsSection />
      </section>

      <AngledDivider flip />

      {/* How it works */}
      <section className="px-4 py-20 sm:py-28">
        <HowItWorksPreview />
      </section>

      <AngledDivider />

      {/* Trust */}
      <section className="bg-muted/30 px-4 py-20 sm:py-28">
        <TrustSection />
      </section>

      <AngledDivider flip />

      {/* Final CTA */}
      <Reveal>
        <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Ready to see it for yourself?
          </h2>
          <p className="mt-3 text-muted-foreground">
            No screenshots. No duplicate entries. Just a ticket that works
            exactly once.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button size="lg" nativeButton={false} render={<Link href="/signup" />}>
              Create your account
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/how-it-works" />}
            >
              See how it works
            </Button>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
