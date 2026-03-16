"use client";

import Image from "next/image";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import ScrollReveal from "./components/ScrollReveal";
import SynapseOasisLogo from "./components/SynapseOasisLogo";
import AnimatedStats from "./components/AnimatedStats";
import ContactForm from "./components/ContactForm";

/* ── Icons ─────────────────────────────────── */
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="9" fill="var(--blue-cta)" fillOpacity="0.12"/>
    <path d="M5.5 9.5l2 2 5-5" stroke="var(--blue-cta)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ForgeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const KeyIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="8" cy="15" r="4" />
    <path d="M11.5 11.5L17 6" />
    <path d="M15 8l2-2" />
    <path d="M17 6l2 2" />
  </svg>
);

const HeartPulseIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M3 12h4l3-9 4 18 3-9h4" />
  </svg>
);

const QualityIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

/* ── Page ───────────────────────────────────── */
export default function Home() {
  return (
    <main className="min-h-screen">
      <NavBar
        links={[
          { label: "What We Build", href: "#what-we-build" },
          { label: "Our Approach", href: "#approach" },
          { label: "About", href: "#about" },
          { label: "Support", href: "https://synapseoasis.atlassian.net/servicedesk/customer/portals" },
          { label: "Contact", href: "#contact" },
        ]}
        ctaHref="#contact"
        ctaLabel="Get in Touch"
      />

      {/* ── Hero (dark, with NeuralCanvas) ──── */}
      <HeroSection />

      {/* ── Stats (dark navy band) ───────────── */}
      <section className="relative z-10" style={{ background: "var(--navy)" }}>
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-3">
          {[
            { number: "15+", label: "Years of Atlassian consulting", color: "#EC8546" },
            { number: "200+", label: "Projects delivered", color: "#7E7CDE" },
            { number: "50+", label: "Enterprise clients served", color: "#51A2E7" },
          ].map((stat, i) => (
            <ScrollReveal key={stat.number} delay={i * 100}>
              <div className="py-10 px-6 md:px-8 text-center" style={{ borderRight: i < 2 ? "1px dashed rgba(255,255,255,0.1)" : "none" }}>
                <p className="text-3xl md:text-4xl font-bold tabular-nums" style={{ color: stat.color }}>{stat.number}</p>
                <p className="text-xs mt-2 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── What We Build (light bg) ─────────── */}
      <section id="what-we-build" className="py-20 md:py-28 geo-pattern">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="section-label mb-6 inline-block">What We Build</span>
              <h2 style={{ color: "var(--navy)" }}>
                Apps That Solve Real Problems
                <br />
                <span style={{ color: "var(--grey)" }}>in Jira, JSM &amp; Confluence</span>
              </h2>
              <p className="text-base max-w-2xl mx-auto mt-5" style={{ color: "var(--grey)" }}>
                Forge-native apps built from 15+ years of enterprise Atlassian consulting. Each one solves a real problem we encountered in the field.
              </p>
            </div>
          </ScrollReveal>

          {/* Row 1: AI & Security apps */}
          <div className="grid md:grid-cols-3" style={{ border: "1px dashed var(--border)" }}>
            {[
              {
                icon: "/ai-triage.png",
                title: "AI Triage",
                desc: "Intelligent ticket routing and incident detection. The Dispatcher Agent assigns teams and users automatically, Smart Escalation handles priority-based routing, and Incident Detection clusters similar issues in real time.",
                color: "#7E7CDE",
                checks: ["Auto-routing", "Smart Escalation", "Incident Clustering", "Real-time Detection"],
              },
              {
                icon: "/ai-portal.png",
                title: "AI Portal Chat",
                desc: "AI-powered chatbot for Jira Service Management portals. Answers customer questions instantly, creates tickets from conversations, and reduces agent workload with intelligent self-service.",
                color: "#2B2ED8",
                checks: ["Portal Chatbot", "Auto Ticket Creation", "Self-service AI", "Agent Assist"],
              },
              {
                icon: "/secret-scanner.png",
                title: "Secret Scanner",
                desc: "Scans issues, comments, and attachments for exposed credentials — API keys, tokens, passwords, and secrets. Alerts administrators before sensitive data spreads across your Jira instance.",
                color: "#E5484D",
                checks: ["Credential Detection", "Real-time Scanning", "Admin Alerts", "Data Protection"],
              },
            ].map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 100}>
                <div
                  className="p-8 md:p-10 h-full"
                  style={{
                    borderRight: i % 3 !== 2 ? "1px dashed var(--border)" : "none",
                    background: "white",
                  }}
                >
                  <Image src={card.icon} alt={card.title} width={72} height={72} className="rounded-xl mb-6" />
                  <h3 className="font-bold mb-3" style={{ color: "var(--navy)" }}>{card.title}</h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--grey)" }}>{card.desc}</p>
                  <div className="space-y-2">
                    {card.checks.map((item) => (
                      <span key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--navy)" }}>
                        <CheckIcon /> {item}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Row 2: Toolkits */}
          <div className="grid md:grid-cols-3" style={{ border: "1px dashed var(--border)", borderTop: "none" }}>
            {[
              {
                icon: "/workflow-toolkit.png",
                title: "Workflow Toolkit",
                desc: "AI-powered workflow modules — conditions, validators, and post-functions. Define rules in plain language: the AI generates Jira expressions, validates transitions, and executes multi-step actions automatically.",
                color: "#51A2E7",
                checks: ["AI Conditions", "AI Validators", "AI Post Functions", "Workflow Automation"],
              },
              {
                icon: "/admin-toolkit.png",
                title: "Admin Toolkit",
                desc: "The admin tools Atlassian doesn't ship. Bulk operations, permission auditing, configuration management, and instance cleanup — everything a Jira administrator needs to manage at scale.",
                color: "#EC8546",
                checks: ["Bulk Operations", "Permission Audit", "Config Management", "Instance Cleanup"],
              },
              {
                icon: "/cf-toolkit.png",
                title: "Custom Fields Toolkit",
                desc: "Purpose-built custom fields that Jira doesn't offer natively. Issue pickers with JQL filtering, checklists with progress tracking, and project-managed select lists — so project leads can manage field options without being Jira admins.",
                color: "#3B9FE3",
                checks: ["Issue Picker", "Checklists", "Project-managed Lists", "No Admin Required"],
              },
            ].map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 100}>
                <div
                  className="p-8 md:p-10 h-full"
                  style={{
                    borderRight: i % 3 !== 2 ? "1px dashed var(--border)" : "none",
                    background: "white",
                  }}
                >
                  <Image src={card.icon} alt={card.title} width={72} height={72} className="rounded-xl mb-6" />
                  <h3 className="font-bold mb-3" style={{ color: "var(--navy)" }}>{card.title}</h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--grey)" }}>{card.desc}</p>
                  <div className="space-y-2">
                    {card.checks.map((item) => (
                      <span key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--navy)" }}>
                        <CheckIcon /> {item}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Row 3: Health Hub, License Waste Manager, Markdown Toolkit */}
          <div className="grid md:grid-cols-3" style={{ border: "1px dashed var(--border)", borderTop: "none" }}>
            {[
              {
                icon: "/health-hub.png",
                title: "Health Hub",
                desc: "Project health dashboard that analyzes your Jira configuration — schemes, screens, workflows, permissions, and fields. Generates a quality score with actionable recommendations to clean up your instance.",
                color: "#2BC48A",
                checks: ["Health Score", "Config Analysis", "Recommendations", "Scheme Audit"],
              },
              {
                icon: "/license-waste.png",
                title: "License Waste Manager",
                desc: "Identifies inactive users across Jira, Confluence, JSM, and Product Discovery. Visualizes license utilization, automates deprovisioning with scheduled rules, and tracks every action in a compliance-ready audit log.",
                color: "#9B59B6",
                checks: ["Inactive User Detection", "Automation Rules", "Multi-product Scan", "Audit & Compliance"],
              },
              {
                icon: "/markdown-toolkit.png",
                title: "Markdown Toolkit",
                desc: "Export and import Confluence content as Markdown. Supports single pages, page trees, and full spaces. Includes an in-page macro that renders Markdown with code highlighting, Mermaid diagrams, and math expressions.",
                color: "#2B9F6F",
                checks: ["Page & Space Export", "Markdown Import", "Mermaid Diagrams", "Code Highlighting"],
              },
            ].map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 100}>
                <div
                  className="p-8 md:p-10 h-full"
                  style={{
                    borderRight: i % 3 !== 2 ? "1px dashed var(--border)" : "none",
                    background: "white",
                  }}
                >
                  <Image src={card.icon} alt={card.title} width={72} height={72} className="rounded-xl mb-6" />
                  <h3 className="font-bold mb-3" style={{ color: "var(--navy)" }}>{card.title}</h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--grey)" }}>{card.desc}</p>
                  <div className="space-y-2">
                    {card.checks.map((item) => (
                      <span key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--navy)" }}>
                        <CheckIcon /> {item}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Approach (light bg) ──────────── */}
      <section id="approach" className="py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="section-label mb-6 inline-block" style={{ background: "rgba(236,133,70,0.08)", color: "var(--orange)" }}>Our Approach</span>
              <h2 style={{ color: "var(--navy)" }}>
                How We Build
              </h2>
              <p className="text-base max-w-2xl mx-auto mt-5" style={{ color: "var(--grey)" }}>
                Every decision we make is guided by the same principles we followed when advising enterprise clients.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-px" style={{ border: "1px dashed var(--border)" }}>
            {[
              {
                icon: <ForgeIcon />,
                title: "Forge Native, Always",
                desc: "Every app runs on Atlassian Forge. No Connect proxies, no external servers, no data leaving the Atlassian ecosystem. Your security and compliance teams will approve these without hesitation.",
                color: "#2B2ED8",
              },
              {
                icon: <KeyIcon />,
                title: "Powered by Forge LLM",
                desc: "Our AI apps use Forge LLM — Atlassian's native AI runtime that keeps everything inside the platform. No external API keys, no third-party servers, no data leaving the Atlassian ecosystem. Enterprise-grade AI with zero configuration.",
                color: "#EC8546",
              },
              {
                icon: <HeartPulseIcon />,
                title: "Built by Practitioners",
                desc: "We are Atlassian consultants who spent 15+ years implementing Jira and JSM for enterprises. Every app solves a real problem we encountered in the field — not a feature we imagined in a boardroom.",
                color: "#51A2E7",
              },
              {
                icon: <QualityIcon />,
                title: "Quality Over Quantity",
                desc: "We do not ship features to pad a marketing page. Every capability maps to a real workflow need. If it does not make your team measurably more efficient, we do not build it.",
                color: "#2BC48A",
              },
            ].map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 100}>
                <div
                  className="p-8 md:p-10 h-full"
                  style={{
                    background: "white",
                    borderRight: i % 2 === 0 ? "1px dashed var(--border)" : "none",
                    borderBottom: i < 2 ? "1px dashed var(--border)" : "none",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${card.color}12`, color: card.color }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="font-bold mb-3" style={{ color: "var(--navy)" }}>{card.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--grey)" }}>
                    {card.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Difference (dark navy) ───────── */}
      <section className="py-20 md:py-28 relative" style={{ background: "var(--hero-gradient)" }}>
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#EC8546" }}>
              THE DIFFERENCE
            </span>
            <h2 className="text-white mt-4 mb-12">
              We Built These
              <br />
              <span style={{ color: "rgba(255,255,255,0.4)" }}>for Ourselves First.</span>
            </h2>
          </ScrollReveal>

          <div className="space-y-6">
            {[
              [
                "Most Marketplace vendors start with a technology and look for a problem.",
                "We started with 15 years of problems and built the tools we needed.",
              ],
              [
                "Most plugins add complexity to your stack with external servers and data pipelines.",
                "Every SynapseOasis app runs on Forge. No external infrastructure. No data leaks.",
              ],
              [
                "Most AI plugins require external API keys and route your data through third-party servers.",
                "We use Forge LLM — AI runs natively inside Atlassian. No external keys, no data leaving the platform.",
              ],
              [
                "Most vendors ship features to check marketing boxes.",
                "We ship features because we needed them on real projects with real deadlines.",
              ],
            ].map((contrast, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div
                    className="rounded-lg px-6 py-5"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(255,255,255,0.08)" }}
                  >
                    <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>
                      Others
                    </span>
                    <p className="text-sm mt-2 leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {contrast[0]}
                    </p>
                  </div>
                  <div
                    className="rounded-lg px-6 py-5"
                    style={{ background: "rgba(43,46,216,0.2)", border: "1px solid rgba(43,46,216,0.35)" }}
                  >
                    <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "#7E7CDE" }}>
                      SynapseOasis
                    </span>
                    <p className="text-sm mt-2 leading-relaxed text-white">{contrast[1]}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── About (light bg) ─────────────────── */}
      <section id="about" className="py-20 md:py-28 geo-pattern">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="mb-16">
              <span className="section-label mb-6 inline-block" style={{ background: "rgba(236,133,70,0.08)", color: "var(--orange)" }}>
                Our Origin
              </span>
              <h2 style={{ color: "var(--navy)" }}>
                Born From the Trenches,
                <br />
                <span style={{ color: "var(--grey)" }}>Not a Boardroom.</span>
              </h2>
              <div className="space-y-5 text-base leading-relaxed mt-6" style={{ color: "var(--grey)" }}>
                <p>
                  We are Atlassian consultants. For over 15 years, we have been implementing Jira and Jira Service Management for enterprises across industries. We configured service desks, designed ITIL-aligned processes, built custom workflows, developed plugins, and trained teams on best practices.
                </p>
                <p>
                  We watched the same patterns repeat in every engagement. Tickets misrouted because users picked the wrong category. Agents spending half their day chasing incomplete information. Custom fields that were never quite right. Admin operations that took hours when they should take minutes.
                </p>
                <p>
                  These are not edge cases — they are systemic. So we started building. First for ourselves, then for our clients, and now for everyone on the Atlassian Marketplace. Every app we build exists because we lived the pain firsthand.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Contact (dark navy) ──────────────── */}
      <section id="contact" className="py-20 md:py-28" style={{ background: "var(--navy)" }}>
        <div className="max-w-[800px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="flex justify-center mb-6">
                <SynapseOasisLogo size={64} />
              </div>
              <h2 className="text-white mb-4">
                Ready to Transform
                <br />
                <span style={{ color: "rgba(255,255,255,0.4)" }}>Your Atlassian Stack?</span>
              </h2>
              <p className="text-base mb-2 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
                Get in touch to discuss how SynapseOasis can help your team.
              </p>
            </div>
            <ContactForm />
          </ScrollReveal>
        </div>
      </section>

      {/* ── Footer ───────────────────────────── */}
      <footer style={{ background: "var(--navy-deep)", borderTop: "1px dashed rgba(255,255,255,0.08)" }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <SynapseOasisLogo size={24} />
            <span className="font-bold text-xs uppercase tracking-wider text-white" style={{ opacity: 0.7 }}>
              SynapseOasis
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#about" className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }}>
              About
            </a>
            <a href="https://synapseoasis.atlassian.net/servicedesk/customer/portals" target="_blank" rel="noopener noreferrer" className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }}>
              Support
            </a>
            <a href="#contact" className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }}>
              Contact
            </a>
          </div>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>
            &copy; 2026 SynapseOasis. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
