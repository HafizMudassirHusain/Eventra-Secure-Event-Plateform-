export const metadata = {
  title: "Privacy Policy — Eventra",
  description: "How Eventra handles your data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Placeholder policy — not yet reviewed by legal counsel. Replace before
        collecting real user data in production.
      </p>

      <div className="mt-10 space-y-8 text-sm text-muted-foreground">
        <section>
          <h2 className="font-medium text-foreground">What we collect</h2>
          <p className="mt-2">
            Account information (name, email), event registration details
            (attendee name and email per registration), and payment
            confirmation status. We do not store card numbers — payment
            details are handled entirely by Stripe.
          </p>
        </section>
        <section>
          <h2 className="font-medium text-foreground">How it's used</h2>
          <p className="mt-2">
            To create and manage your account, process event registrations
            and payments, issue tickets, and let organizers see who has
            registered for their events.
          </p>
        </section>
        <section>
          <h2 className="font-medium text-foreground">Who can see your data</h2>
          <p className="mt-2">
            Organizers can see registration details (name, email, status) for
            their own events only. We don&apos;t sell or share your data with
            third parties beyond the payment processor required to complete
            a transaction.
          </p>
        </section>
        <section>
          <h2 className="font-medium text-foreground">Your control over your data</h2>
          <p className="mt-2">
            You can cancel a registration at any time from your account. For
            account deletion requests, contact us directly.
          </p>
        </section>
      </div>
    </div>
  );
}
