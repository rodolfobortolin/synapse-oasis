import Link from "next/link";
import Image from "next/image";
import { allApps, pageHref, hasPrivacyPolicy, DOCS_ROOT } from "../lib";

/**
 * App-per-group sidebar. Only the current app's pages are expanded — with eight apps
 * the fully expanded list would be ~40 rows, which stops being navigation.
 */
export default function DocsSidebar({
  activeApp,
  activePage,
}: {
  activeApp?: string;
  activePage?: string;
}) {
  const apps = allApps();

  return (
    <nav className="text-[13px]">
      <Link
        href={DOCS_ROOT}
        className="flex items-center gap-2 px-2.5 py-2 rounded-md mb-3 transition-colors hover:bg-[var(--offwhite)]"
        style={{ color: activeApp ? "var(--grey)" : "var(--navy)", fontWeight: activeApp ? 400 : 600 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
        All apps
      </Link>

      {apps.map((app) => {
        const open = app.slug === activeApp;
        return (
          <div key={app.slug} className="mb-1.5">
            <Link
              href={pageHref(app.slug, app.pages[0].slug)}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors hover:bg-[var(--offwhite)]"
              style={{ color: open ? "var(--navy)" : "#5A6472", fontWeight: open ? 700 : 500 }}
            >
              <Image src={app.icon} alt="" width={18} height={18} className="rounded shrink-0" />
              <span className="leading-tight">{app.shortName}</span>
            </Link>

            {open && (
              <div className="mt-0.5 ml-[13px] pl-3.5" style={{ borderLeft: "1px dashed var(--border)" }}>
                {app.pages.map((p) => {
                  const current = p.slug === activePage;
                  return (
                    <Link
                      key={p.slug}
                      href={pageHref(app.slug, p.slug)}
                      className="block px-2.5 py-1.5 rounded-md transition-colors hover:bg-[var(--offwhite)]"
                      style={{
                        color: current ? "var(--blue-cta)" : "#5A6472",
                        fontWeight: current ? 600 : 400,
                        background: current ? "rgba(43,46,216,0.05)" : "transparent",
                      }}
                    >
                      {p.title}
                    </Link>
                  );
                })}
                {hasPrivacyPolicy(app.slug) && (
                  <Link
                    href={`/privacy/${app.slug}`}
                    className="block px-2.5 py-1.5 rounded-md transition-colors hover:bg-[var(--offwhite)]"
                    style={{ color: "#8A929E" }}
                  >
                    Privacy policy
                  </Link>
                )}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
