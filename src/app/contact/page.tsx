import { Mail } from "lucide-react";

export const metadata = {
  title: "Contact — Eventra",
  description: "Get in touch.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20">
      <p className="text-sm font-medium uppercase tracking-wide text-primary">
        Contact
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Something wrong, or something to say?
      </h1>
      <p className="mt-4 text-muted-foreground">
        Whether it&apos;s a bug, a question about an event, or something
        that just didn&apos;t work the way you expected — reach out directly.
      </p>

      <a
        href="mailto:support@eventra.app"
        className="mt-8 inline-flex items-center gap-2 text-lg font-medium text-primary hover:underline"
      >
        <Mail className="size-5" />
        support@eventra.app
      </a>

      <p className="mt-10 text-sm text-muted-foreground">
        In-app support and a proper contact form are on the roadmap — for now,
        email is the fastest way to reach us.
      </p>
    </div>
  );
}
