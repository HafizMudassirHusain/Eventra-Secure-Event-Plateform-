import Link from "next/link";
import { Mail, MessageCircleQuestion, ShieldAlert, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AngledDivider } from "@/components/marketing/angled-divider";
import { Reveal } from "@/components/motion/reveal";

export const metadata = {
  title: "Contact — Eventra",
  description: "Get in touch about support, organizing, or security issues.",
};

const CHANNELS = [
  {
    icon: MessageCircleQuestion,
    title: "General & support",
    body: "Bugs, account issues, or anything that didn't work the way you expected.",
    email: "support@eventra.app",
  },
  {
    icon: Building2,
    title: "Organizer inquiries",
    body: "Questions about creating events, payouts, or managing a larger event.",
    email: "organizers@eventra.app",
  },
  {
    icon: ShieldAlert,
    title: "Security reports",
    body: "Found a vulnerability or something that looks like a security issue? Tell us directly.",
    email: "security@eventra.app",
  },
] as const;

export default function ContactPage() {
  return (
    <div>
      <section className="mx-auto max-w-2xl px-4 py-20 text-center">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-wide text-primary">
            Contact
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Something wrong, or something to say?
          </h1>
          <p className="mt-4 text-muted-foreground">
            We don&apos;t have a support queue yet — every message goes
            straight to a real inbox, and we read all of them. Pick the
            category that fits best below.
          </p>
        </Reveal>
      </section>

      <AngledDivider />

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {CHANNELS.map((channel, i) => (
            <Reveal key={channel.title} delay={i * 0.1}>
              <Card className="h-full">
                <CardContent className="flex h-full flex-col pt-6">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <channel.icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-medium">{channel.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">
                    {channel.body}
                  </p>
                  <a
                    href={`mailto:${channel.email}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    <Mail className="size-4" />
                    {channel.email}
                  </a>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <AngledDivider flip />

      <Reveal>
        <section className="mx-auto max-w-2xl px-4 py-16 text-center">
          <h2 className="text-xl font-semibold tracking-tight">
            Looking for a quick answer instead?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Most common questions — about tickets, payments, and organizing —
            are already answered on our FAQ page.
          </p>
          <Link
            href="/faq"
            className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
          >
            Check the FAQ →
          </Link>
        </section>
      </Reveal>
    </div>
  );
}
