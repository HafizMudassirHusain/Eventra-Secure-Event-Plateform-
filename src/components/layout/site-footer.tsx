import Link from "next/link";

const LINK_GROUPS = [
  {
    title: "Product",
    links: [
      { label: "Browse events", href: "/events" },
      { label: "How it works", href: "/how-it-works" },
      { label: "For organizers", href: "/organizers" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Eventra
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">
            Tickets that only work once.
          </p>
        </div>

        {LINK_GROUPS.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-medium">{group.title}</h3>
            <ul className="mt-3 space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t px-4 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Eventra.
      </div>
    </footer>
  );
}
