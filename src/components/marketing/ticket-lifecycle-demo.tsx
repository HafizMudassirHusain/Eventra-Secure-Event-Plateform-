"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle2, Ticket, ScanLine, Ban } from "lucide-react";

const STAGES = [
  {
    key: "paid",
    label: "Payment confirmed",
    caption: "Attendee pays — Stripe confirms the charge.",
    icon: CheckCircle2,
    badge: "secondary" as const,
  },
  {
    key: "issued",
    label: "Ticket issued",
    caption: "A single-use token is generated. This QR is it.",
    icon: Ticket,
    badge: "default" as const,
  },
  {
    key: "scanned",
    label: "Scanned at the door",
    caption: "The scanner reads the token and checks it against the server.",
    icon: ScanLine,
    badge: "default" as const,
  },
  {
    key: "dead",
    label: "Invalidated",
    caption: "Token is burned. Any copy of this QR — screenshot or not — is now worthless.",
    icon: Ban,
    badge: "destructive" as const,
  },
] as const;

const STAGE_DURATION_MS = 2200;

export function TicketLifecycleDemo() {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStageIndex((i) => (i + 1) % STAGES.length);
    }, STAGE_DURATION_MS);
    return () => clearInterval(interval);
  }, []);

  const stage = STAGES[stageIndex];
  const isDead = stage.key === "dead";
  const Icon = stage.icon;

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 sm:flex-row sm:items-stretch sm:justify-center">
      <div className="flex flex-col items-center gap-4 rounded-2xl border bg-card p-8">
        <div
          className={cn(
            "rounded-xl border bg-white p-4 transition-opacity duration-500",
            isDead && "opacity-20"
          )}
        >
          <QRCodeSVG value="eventra-demo-ticket" size={160} />
        </div>
        <Badge variant={stage.badge} className="gap-1.5">
          <Icon className="size-3.5" />
          {stage.label}
        </Badge>
      </div>

      <div className="flex flex-col justify-center gap-3 sm:max-w-xs">
        <p className="text-sm text-muted-foreground">{stage.caption}</p>
        <div className="flex gap-1.5">
          {STAGES.map((s, i) => (
            <div
              key={s.key}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors duration-500",
                i <= stageIndex ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          This is a live demo, not a real ticket — but every real Eventra ticket
          follows exactly this lifecycle.
        </p>
      </div>
    </div>
  );
}
