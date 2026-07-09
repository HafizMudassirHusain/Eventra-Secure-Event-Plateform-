export const metadata = {
  title: "Terms of Service — Eventra",
  description: "Terms governing use of Eventra.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20">
      <h1 className="text-3xl font-semibold tracking-tight">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Placeholder terms — not yet reviewed by legal counsel. Replace before
        taking real payments from the public.
      </p>

      <div className="mt-10 space-y-8 text-sm text-muted-foreground">
        <section>
          <h2 className="font-medium text-foreground">1. Accounts</h2>
          <p className="mt-2">
            You&apos;re responsible for the accuracy of the information you
            provide when creating an account and for keeping your login
            credentials secure.
          </p>
        </section>
        <section>
          <h2 className="font-medium text-foreground">2. Event registrations and payments</h2>
          <p className="mt-2">
            Paid registrations are processed through Stripe. A ticket is
            issued only once payment is confirmed. Refund eligibility is
            determined on a per-event basis by the organizer unless
            otherwise stated.
          </p>
        </section>
        <section>
          <h2 className="font-medium text-foreground">3. Organizer responsibilities</h2>
          <p className="mt-2">
            Organizers are responsible for the accuracy of their event
            listings and for honoring the terms under which tickets were
            sold, including cancellations and capacity limits.
          </p>
        </section>
        <section>
          <h2 className="font-medium text-foreground">4. Ticket integrity</h2>
          <p className="mt-2">
            Tickets are single-use and non-transferable outside the platform.
            Attempting to duplicate, forge, or resell a ticket outside
            Eventra may result in account suspension.
          </p>
        </section>
        <section>
          <h2 className="font-medium text-foreground">5. Changes to these terms</h2>
          <p className="mt-2">
            We may update these terms as the platform evolves. Continued use
            after changes constitutes acceptance of the updated terms.
          </p>
        </section>
      </div>
    </div>
  );
}
