import type { Testimonial } from "./types";

/**
 * Testimonials from the existing website, reproduced verbatim. They are only
 * rendered once NEXT_PUBLIC_TESTIMONIALS_APPROVED=true, i.e. after LUCKEY has
 * confirmed each one is genuine and the client has agreed to publication.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Neha",
    profession: "Designer",
    quote:
      "I was initially unsure about investing in Dubai from India, but the Luckey Property team explained everything clearly and patiently. They understood what I was looking for and helped me choose a property that suited my budget and goals.",
  },
  {
    name: "Kowshal",
    profession: "CEO",
    quote:
      "What I appreciated most was the communication. Every question I had about the property, payment plan, and process was answered clearly. The team made investing in Dubai feel much easier than I expected.",
  },
  {
    name: "Rahul",
    profession: "Engineer",
    quote:
      "I wasn't simply looking for a property—I wanted an investment with good potential for the future. Luckey Property took the time to understand my goals and showed me options that actually made sense for what I wanted.",
  },
  {
    name: "Ashu",
    profession: "Doctor",
    quote:
      "Buying property in another country felt complicated at first. Luckey Property guided me through the process step by step and kept me updated throughout. I felt supported and informed at every stage.",
  },
];
