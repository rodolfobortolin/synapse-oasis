import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://synapseoasis.com";

export const metadata: Metadata = {
  title: "SynapseOasis — Jira & JSM Apps Built on Atlassian Forge | AI-Powered Marketplace Apps",
  description:
    "SynapseOasis builds intelligent Jira and JSM apps on Atlassian Forge. AI-powered ticket routing, portal assistants, admin tools, custom fields, and security scanning for enterprise Jira. 15+ years of Atlassian consulting experience.",
  keywords: [
    "Jira marketplace apps",
    "Atlassian Forge apps",
    "Jira plugins",
    "JSM apps",
    "Jira AI apps",
    "Jira custom fields",
    "Jira admin tools",
    "Atlassian marketplace vendor",
    "Jira ticket routing",
    "Jira security scanning",
    "Forge native apps",
    "Jira Service Management apps",
    "AI ticket routing Jira",
    "Jira automation",
    "Jira workflow automation",
    "Jira bulk operations",
    "Jira permission audit",
    "Jira health monitoring",
    "Jira checklist custom field",
    "Jira issue picker",
    "Jira encrypted fields",
    "BYOK AI Jira",
    "Atlassian consulting",
    "Jira enterprise apps",
    "SynapseOasis",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "SynapseOasis — Intelligent Jira & JSM Apps on Atlassian Forge",
    description:
      "AI-powered Forge-native apps for Jira and JSM. Ticket routing, portal assistants, admin tools, custom fields, and security scanning. Built by Atlassian consultants with 15+ years of experience.",
    url: siteUrl,
    siteName: "SynapseOasis",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "SynapseOasis — Intelligent Apps for Atlassian Jira & JSM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SynapseOasis — Jira & JSM Apps on Atlassian Forge",
    description:
      "AI-powered Forge-native apps for Jira and JSM. Built by Atlassian consultants with 15+ years of experience.",
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "google-site-verification": "",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "SynapseOasis",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo-256.png`,
          width: 256,
          height: 256,
        },
        description:
          "SynapseOasis builds intelligent Jira and JSM apps on Atlassian Forge. AI-powered marketplace apps for ticket routing, admin tools, custom fields, and security scanning.",
        foundingDate: "2011",
        sameAs: [],
        contactPoint: {
          "@type": "ContactPoint",
          email: "contact@synapseoasis.com",
          contactType: "sales",
        },
        knowsAbout: [
          "Atlassian Jira",
          "Jira Service Management",
          "Atlassian Forge",
          "Atlassian Marketplace",
          "ITSM",
          "AI ticket routing",
          "Jira plugins",
          "Jira custom fields",
          "Enterprise Jira administration",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "SynapseOasis",
        publisher: { "@id": `${siteUrl}/#organization` },
        description:
          "Intelligent Jira & JSM apps built on Atlassian Forge by experienced Atlassian consultants.",
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: "SynapseOasis — Jira & JSM Apps Built on Atlassian Forge",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#organization` },
        description:
          "AI-powered Forge-native apps for Jira and JSM. Ticket routing, portal assistants, admin tools, custom fields, and security scanning for enterprise teams.",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: siteUrl,
            },
          ],
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/logo-256.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
