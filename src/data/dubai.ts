/**
 * "Why Dubai" content. Reviewed October 2026. Facts are stated with their
 * official source; anything that changes over time is flagged for checking.
 */
export const reviewedOn = "October 2026";

export const sources = {
  dld: { label: "Dubai Land Department", url: "https://dubailand.gov.ae/en/" },
  goldenVisa: {
    label: "UAE Government portal — Golden Visa",
    url: "https://u.ae/en/information-and-services/visa-and-emirates-id/residence-visas/golden-visa",
  },
  icp: { label: "Federal Authority for Identity, Citizenship, Customs & Port Security (ICP)", url: "https://icp.gov.ae/en/" },
  gdrfa: { label: "GDRFA Dubai", url: "https://gdrfad.gov.ae/en" },
  fta: { label: "UAE Federal Tax Authority", url: "https://tax.gov.ae/en/" },
  rbi: { label: "Reserve Bank of India — Liberalised Remittance Scheme", url: "https://www.rbi.org.in/" },
  itd: { label: "Income Tax Department, India", url: "https://www.incometax.gov.in/" },
};

export const whyDubai = [
  {
    slug: "ownership-costs",
    title: "Property ownership costs",
    lead: "Dubai does not charge a conventional annual property tax on owning a home. That is different from saying ownership is cost-free.",
    body: [
      "There is no recurring annual tax levied on the value of a property you own in Dubai, which is one reason the city is often compared favourably with markets such as London or New York.",
      "You will still pay one-off costs when you buy. The Dubai Land Department transfer fee is 4% of the purchase price, plus registration and administrative charges; off-plan purchases are registered on the Oqood system. Agency fees, any mortgage-related fees and conveyancing costs may also apply.",
      "Owners pay annual service charges for the upkeep of the building and community, which vary considerably between projects. Utility bills from DEWA include a municipality housing fee. If you let the property, there are leasing and management costs too.",
      "Tax depends on where you are resident as well as where the property is. If you are tax-resident in India, for example, rental income and gains on Dubai property are generally taxable in India and must be reported there.",
    ],
    caveat: "Fees change. Confirm the current schedule with the Dubai Land Department and take tax advice for your own circumstances.",
    sourceKeys: ["dld", "fta", "itd"] as const,
  },
  {
    slug: "rental-potential",
    title: "Rental potential",
    lead: "Dubai's large and diverse population creates demand for rental homes — but the return on a particular property depends on many things.",
    body: [
      "Most of Dubai's residents are expatriates, and many rent rather than buy. That supports a deep rental market across a wide range of budgets and property types.",
      "What a specific property earns depends on its location and type, the price you pay, how often it is occupied, service charges, management and maintenance costs, whether it is let long-term or as a licensed holiday home, and the wider market at the time.",
      "Long-term tenancies are registered through Ejari, and rent increases are governed by the RERA rental index. Short-term holiday-home letting requires a permit from Dubai's Department of Economy and Tourism.",
    ],
    caveat: "Rental income is not guaranteed. Past rental performance does not predict future returns.",
    sourceKeys: ["dld"] as const,
  },
  {
    slug: "golden-visa",
    title: "Golden Visa eligibility",
    lead: "Some property investors may qualify for UAE residency, including the 10-year Golden Visa. Buying a property does not, on its own, guarantee a visa.",
    body: [
      "The UAE offers long-term residency routes for real estate investors. Official guidance has set a minimum property value for the Golden Visa — published as AED 2 million — along with conditions on how the property is held, financed and, for off-plan purchases, which developers qualify.",
      "Eligibility is decided by the UAE authorities, not by the seller, developer or agent. The criteria are reviewed from time to time, and personal factors also apply.",
    ],
    caveat: "Check the current requirements on official UAE government channels before relying on a residency outcome.",
    sourceKeys: ["goldenVisa", "icp", "gdrfa"] as const,
  },
  {
    slug: "payment-plans",
    title: "Payment plans",
    lead: "Many off-plan developments spread payments across booking, construction and sometimes the period after handover.",
    body: [
      "A payment plan might ask for a deposit on booking, a series of instalments linked to construction milestones or dates, and a final balance on handover. Some projects offer post-handover plans, where part of the price is paid after completion.",
      "Terms differ from project to project and can change between launches. In Dubai, payments for off-plan property are made into a registered project escrow account, which is one of the things worth confirming before you commit.",
    ],
    caveat: "Payment terms vary by project and must be confirmed with the developer in writing.",
    sourceKeys: ["dld"] as const,
  },
] as const;
