/** The three services LUCKEY Properties confirms it offers. */
export const services = [
  {
    slug: "buy-and-sell",
    number: "01",
    name: "Buy & Sell Properties",
    short: "Buy, sell or upgrade your Dubai property with guidance, suitable opportunities and support throughout the process.",
    detail: [
      "Whether you are buying your first property in Dubai, selling one you own, or moving up to something larger, we start with what you are trying to achieve and work from there.",
      "We help you find suitable opportunities, explain what you are looking at, and stay with you through the steps that follow — from first shortlist to the agreed transaction.",
    ],
    points: ["Buying ready and off-plan property", "Selling or upgrading an existing home", "Shortlists matched to your brief", "Support through the agreed process"],
    enquiry: "buy-sell",
  },
  {
    slug: "investment-guidance",
    number: "02",
    name: "Investment Guidance",
    short: "Evaluate Dubai property opportunities against your budget, objectives, preferred locations, potential rental income and available payment options.",
    detail: [
      "Two properties at the same price can be very different investments. We help you compare opportunities on the things that matter to you: budget, location, how you intend to use the property, the rent it might realistically achieve, and the payment options available.",
      "Our role is to help you make an informed decision. Rental income and capital growth are never guaranteed, and we will always tell you what we know and what still needs checking.",
    ],
    points: ["Budget and objective review", "Location comparison", "Rental considerations", "Payment-plan comparison"],
    enquiry: "investment",
  },
  {
    slug: "property-management",
    number: "03",
    name: "Property Management",
    short: "Support for property owners — including those living outside the UAE — with regular updates and help managing their property.",
    detail: [
      "Owning property in Dubai while living in India or elsewhere means relying on someone on the ground. We support owners with regular updates and help with the day-to-day management of their property.",
      "Tell us about your property and what you need, and we will explain how we can help.",
    ],
    points: ["Support for overseas owners", "Regular updates", "Help managing your property", "A single point of contact in Dubai"],
    enquiry: "management",
  },
] as const;
