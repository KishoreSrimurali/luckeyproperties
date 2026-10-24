import type { Metadata } from "next";
import { ConsentButton } from "@/components/Consent";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy & Preferences",
  description: "The cookies and similar technologies used on the LUCKEY Properties website, and how to change your choices.",
  alternates: { canonical: "/cookie-preferences" },
};

const rows = [
  ["lp_consent", "Essential", "Remembers your cookie choices.", "6 months"],
  ["lp_attr (session storage)", "Essential", "Remembers which page or campaign you arrived from during this visit, so an enquiry you send can be attributed correctly. Cleared when you close the tab.", "Session"],
  ["_ga, _ga_*", "Analytics (optional)", "Google Analytics — counts visits and measures which pages and forms are used. Only set if you accept analytics cookies.", "Up to 13 months"],
  ["Google Maps", "Third party (optional)", "Set by Google only if you choose to load a map.", "Set by Google"],
];

export default function Cookies() {
  return (
    <LegalPage
      title="Cookie Policy"
      slug="cookie-preferences"
      updated="October 2026"
      intro="We use a small number of cookies. Optional ones are only set if you agree."
      sections={[
        {
          id: "choices",
          h: "Your choices",
          body: (
            <>
              <p>You can accept or reject optional cookies, or change your mind at any time.</p>
              <ConsentButton className="btn btn--sm">Change cookie preferences</ConsentButton>
            </>
          ),
        },
        {
          id: "list",
          h: "Cookies we use",
          body: (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                <thead>
                  <tr style={{ textAlign: "left", borderBottom: "1px solid var(--line-light)" }}>
                    <th style={{ padding: "10px 12px 10px 0" }}>Name</th>
                    <th style={{ padding: "10px 12px 10px 0" }}>Type</th>
                    <th style={{ padding: "10px 12px 10px 0" }}>Purpose</th>
                    <th style={{ padding: "10px 0" }}>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r[0]} style={{ borderBottom: "1px solid var(--line-light)", verticalAlign: "top" }}>
                      {r.map((c, i) => (
                        <td key={i} style={{ padding: "12px 12px 12px 0", color: i ? "var(--stone)" : "var(--ink)" }}>{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        },
        { id: "browser", h: "Browser controls", body: <p>Most browsers also let you block or delete cookies. Blocking essential cookies may stop parts of the site, such as remembering your choices, from working.</p> },
      ]}
    />
  );
}
