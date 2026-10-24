import type { Location } from "./types";

/** The four locations highlighted on the existing website. Qualitative orientation only. */
export const locations: Location[] = [
  {
    slug: "dubai-creek-harbour",
    name: "Dubai Creek Harbour",
    line: "On the water, facing the skyline",
    summary:
      "A large waterfront community on Dubai Creek, beside the Ras Al Khor Wildlife Sanctuary, with views back across the water to Downtown.",
    body: [
      "Dubai Creek Harbour is a master-planned district being built out in phases along the historic creek. Residential towers sit along promenades and parkland, and many look directly towards the Downtown skyline.",
      "Because the community is still taking shape, it combines completed buildings with projects under construction. That matters when you compare handover timelines, and when you think about which amenities will already be open by the time you move in or let the property.",
    ],
    facts: ["Waterfront promenades", "Next to Ras Al Khor sanctuary", "Phased master plan", "Close to DXB airport"],
    imageAlt: "Dubai Creek Harbour waterfront with the Downtown skyline in the distance",
    geoQuery: "Dubai Creek Harbour, Dubai",
  },
  {
    slug: "dubai-islands",
    name: "Dubai Islands",
    line: "Dubai's newest coastline",
    summary:
      "A group of reclaimed islands off the Deira coast, formerly known as Deira Islands, planned around beaches, marinas, resorts and residential neighbourhoods.",
    body: [
      "Dubai Islands extends the city's northern shoreline with new beaches, a marina and mixed residential and hospitality districts. Much of the area is at an early stage of development.",
      "For buyers, early-stage locations usually mean more off-plan choice and a longer wait for completed infrastructure. It is worth looking closely at the master plan, the order in which phases are delivered, and each developer's track record.",
    ],
    facts: ["Reclaimed islands off Deira", "Beaches and marina", "Early-stage master plan", "Mostly off-plan supply"],
    imageAlt: "Beachfront and new development on Dubai Islands",
    geoQuery: "Dubai Islands, Dubai",
  },
  {
    slug: "expo-city",
    name: "Expo City",
    line: "The Expo 2020 site, reimagined",
    summary:
      "The former Expo 2020 Dubai site in the south of the city, now being turned into a mixed-use community that reuses much of the original infrastructure.",
    body: [
      "Expo City Dubai builds on the infrastructure created for Expo 2020: pavilions, public spaces, a metro station and road links. Residential neighbourhoods are being added alongside offices, parks and cultural venues.",
      "The district sits close to Al Maktoum International Airport and the Dubai South growth corridor. Buyers here are often weighing the area's long-term plans against what is already complete today.",
    ],
    facts: ["Former Expo 2020 site", "Route 2020 metro line", "Near Al Maktoum International Airport", "Mixed-use, green public realm"],
    imageAlt: "Pavilions and public spaces at Expo City Dubai",
    geoQuery: "Expo City Dubai",
  },
  {
    slug: "maritime-city",
    name: "Maritime City",
    line: "A peninsula between port and city",
    summary:
      "Dubai Maritime City is a man-made peninsula between Port Rashid and Dubai Dry Docks, being developed with waterfront residential towers close to the older city.",
    body: [
      "Originally planned as a maritime industry hub, the peninsula is increasingly being developed for waterfront living. Towers look out across the Gulf, Port Rashid and the skyline.",
      "Its position near Al Mina, Bur Dubai and Jumeirah puts it close to the historic centre while still offering new-build stock. As with any area in transition, check carefully which neighbouring plots are residential and which remain industrial.",
    ],
    facts: ["Between Port Rashid and Dry Docks", "Sea and skyline views", "Close to Bur Dubai and Jumeirah", "Area in transition"],
    imageAlt: "Waterfront towers on the Dubai Maritime City peninsula",
    geoQuery: "Dubai Maritime City, Dubai",
  },
];

export const getLocation = (slug: string) => locations.find((l) => l.slug === slug);
