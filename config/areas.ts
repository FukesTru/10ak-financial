/** Cities and areas served. The office is in Monrovia; everywhere else is served virtually or by visit. */
export type AreaRegion = "San Gabriel Valley" | "Greater Los Angeles" | "Orange County" | "Statewide";

export type Area = {
  id: string;
  name: string;
  region: AreaRegion;
  /** schema.org type for areaServed. */
  schemaType: "City" | "AdministrativeArea";
};

export const areas: Area[] = [
  { id: "monrovia", name: "Monrovia", region: "San Gabriel Valley", schemaType: "City" },
  { id: "pasadena", name: "Pasadena", region: "San Gabriel Valley", schemaType: "City" },
  { id: "arcadia", name: "Arcadia", region: "San Gabriel Valley", schemaType: "City" },
  { id: "la-canada-flintridge", name: "La Cañada Flintridge", region: "San Gabriel Valley", schemaType: "City" },
  { id: "los-angeles", name: "Los Angeles", region: "Greater Los Angeles", schemaType: "City" },
  { id: "glendale", name: "Glendale", region: "Greater Los Angeles", schemaType: "City" },
  { id: "burbank", name: "Burbank", region: "Greater Los Angeles", schemaType: "City" },
  { id: "beverly-hills", name: "Beverly Hills", region: "Greater Los Angeles", schemaType: "City" },
  { id: "west-hollywood", name: "West Hollywood", region: "Greater Los Angeles", schemaType: "City" },
  { id: "encino", name: "Encino", region: "Greater Los Angeles", schemaType: "City" },
  { id: "sherman-oaks", name: "Sherman Oaks", region: "Greater Los Angeles", schemaType: "City" },
  { id: "woodland-hills", name: "Woodland Hills", region: "Greater Los Angeles", schemaType: "City" },
  { id: "malibu", name: "Malibu", region: "Greater Los Angeles", schemaType: "City" },
  { id: "thousand-oaks", name: "Thousand Oaks", region: "Greater Los Angeles", schemaType: "City" },
  { id: "orange-county", name: "Orange County", region: "Orange County", schemaType: "AdministrativeArea" },
  { id: "costa-mesa", name: "Costa Mesa", region: "Orange County", schemaType: "City" },
  { id: "irvine", name: "Irvine", region: "Orange County", schemaType: "City" },
  { id: "newport-beach", name: "Newport Beach", region: "Orange County", schemaType: "City" },
  { id: "san-diego", name: "San Diego", region: "Statewide", schemaType: "City" },
  { id: "san-francisco", name: "San Francisco", region: "Statewide", schemaType: "City" },
];

export const regions: AreaRegion[] = ["San Gabriel Valley", "Greater Los Angeles", "Orange County", "Statewide"];

/** Key cities for the homepage snapshot. */
export const featuredAreaIds = [
  "monrovia",
  "pasadena",
  "arcadia",
  "glendale",
  "burbank",
  "beverly-hills",
  "encino",
  "irvine",
  "newport-beach",
  "san-diego",
];
