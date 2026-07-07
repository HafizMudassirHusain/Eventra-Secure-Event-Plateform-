import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Find events. Register securely. Walk in with a QR code.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        EMS lets organizers run events end-to-end and gives attendees a
        secure, single-use ticket for entry.
      </p>
      <div className="mt-8 flex gap-3">
        <Button size="lg" nativeButton={false} render={<Link href="/events" />}>
          Browse events
        </Button>
        <Button
          size="lg"
          variant="outline"
          nativeButton={false}
          render={<Link href="/login" />}
        >
          Sign in
        </Button>
      </div>
    </div>
  );
}
