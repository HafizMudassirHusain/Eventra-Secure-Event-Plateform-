export const metadata = {
  title: "FAQ — Eventra",
  description: "Common questions about tickets, payments, and organizing.",
};

const FAQS = [
  {
    q: "Is my payment actually secure?",
    a: "Yes — payments run through Stripe's hosted checkout. Eventra never sees or stores your card details; Stripe handles that entirely, and your ticket isn't issued until Stripe confirms the payment actually went through.",
  },
  {
    q: "Can someone else use my ticket if they see my QR code?",
    a: "Each ticket is a single-use token. The first successful scan invalidates it — so even if a copy exists somewhere, it stops working the moment the real one is used.",
  },
  {
    q: "What happens if I cancel my registration?",
    a: "Your spot is released back to the event immediately, and its capacity updates right away so someone else can register if the event was full.",
  },
  {
    q: "What if an organizer cancels the whole event?",
    a: "Every attendee's registration reflects the cancellation immediately, and no one can register for a cancelled event. Refund handling for paid, cancelled events is on our roadmap.",
  },
  {
    q: "How do I become an organizer?",
    a: "Create an account and head to the organizer dashboard to create your first event. See the Organizers page for what the dashboard can do.",
  },
  {
    q: "Do I need the app to show my ticket?",
    a: "Right now, tickets are shown on the website. A dedicated mobile app with additional protections (like blocking screenshots of the ticket screen) is planned but not live yet.",
  },
] as const;

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20">
      <p className="text-sm font-medium uppercase tracking-wide text-primary">
        FAQ
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Questions people actually ask
      </h1>

      <div className="mt-10 space-y-8">
        {FAQS.map((item) => (
          <div key={item.q}>
            <h2 className="font-medium">{item.q}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
